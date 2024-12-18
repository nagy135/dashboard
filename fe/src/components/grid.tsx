"use client";

import { getAllDashboards, updateDashboardItem } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { LogoutForm } from "../app/ui/logout-form";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";

type LucideIconType = keyof typeof Icons;

type Position = [number, number];
type Item = {
  _id: string;
  name: string;
  url: string;
  color: string;
  positions: Position[];
  icon?: string;
};

const compileData = (
  items: Item[],
): {
  rowSpan: number;
  colSpan: number;
  name?: string;
  color: string;
  icon?: string;
}[] => {
  const indexes: (number | string | undefined)[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  for (const item of items) {
    for (const position of item.positions) {
      const [x, y] = position;
      if (x > 9 || y > 9 || x < 0 || y < 0) continue;
      indexes[y][x] = item.name;
    }
  }
  const result: {
    rowSpan: number;
    colSpan: number;
    _id?: string;
    color: string;
  }[] = [];
  for (let y = 0; y < indexes.length; y++) {
    for (let x = 0; x < indexes[y].length; x++) {
      const current = indexes[y][x];
      if (current !== 0 && current !== undefined) {
        let rowSpan = 1;
        while ((indexes?.[y + rowSpan]?.[x] ?? 0) === current) {
          rowSpan++;
        }

        let colSpan = 1;
        while ((indexes?.[y]?.[x + colSpan] ?? 0) === current) {
          colSpan++;
        }

        if (rowSpan > 1 || colSpan > 1) {
          outer: for (let i = rowSpan - 1; i > 0; i--) {
            for (let j = colSpan - 1; j > 0; j--) {
              if (indexes[y + i][x + j] !== current) {
                j = colSpan - 1;
                rowSpan = i;
                continue outer;
              }
            }
          }
        }

        for (let i = 0; i < rowSpan; i++) {
          for (let j = 0; j < colSpan; j++) {
            indexes[y + i][x + j] = undefined;
          }
        }

        result.push({
          ...items.find((item) => item.name === current)!,
          rowSpan,
          colSpan,
        });
      } else {
        if (current === 0) {
          result.push({
            rowSpan: 1,
            colSpan: 1,
            color: "white",
          });
        }
      }
    }
  }

  return result;
};

export default function Grid({ accessToken }: { accessToken: string }) {
  const router = useRouter();
  const [pickedName, setPickedId] = useState<string | undefined>(undefined);
  const dashboardQuery = useQuery({
    refetchOnWindowFocus: true,
    retry: false,
    queryKey: ["dashboards"],
    queryFn: () => getAllDashboards(accessToken),
  });

  if (dashboardQuery.isError) {
    router.push("/");
  }

  const updateDashboardMutation = useMutation({
    mutationFn: updateDashboardItem,
    onSuccess: () => {
      dashboardQuery.refetch();
    },
  });
  const [selectedDashboard, setSelectedDashboard] = useState<number>(0);

  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState<Item[]>(
    (dashboardQuery.data?.[selectedDashboard]?.items ?? []) as Item[],
  );
  useEffect(() => {
    setItems((dashboardQuery.data?.[selectedDashboard]?.items ?? []) as Item[]);
  }, [dashboardQuery.data, selectedDashboard]);

  const compiledData = useCallback(() => compileData(items ?? []), [items]);

  if (!dashboardQuery.isSuccess)
    return (
      <div className="flex justify-center h-screen w-screen">
        <Spinner size={"xxlarge"} />
      </div>
    );

  return (
    <>
      <div className="flex w-full justify-between p-2">
        <div className="flex space-x-2">
          <Select
            onValueChange={(value) => setSelectedDashboard(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Dashboard" />
            </SelectTrigger>
            <SelectContent>
              {dashboardQuery.data?.map((dashboard, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {dashboard._id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className={cn(
              editMode &&
                "border border-green-500 bg-green-200 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:bg-green-400",
            )}
            onClick={() => setEditMode((e) => !e)}
            variant={"outline"}
          >
            Edit
          </Button>
        </div>
        <LogoutForm />
      </div>
      <div
        className="p-2 grid grid-cols-10 grid-rows-10 gap-2 h-[95vh] w-screen bg-gray-100"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const boundingRect = target.getBoundingClientRect();
          const [x, y] = [
            e.clientX - boundingRect.left,
            e.clientY - boundingRect.top,
          ];
          const cellWidth = boundingRect.width / 10;
          const cellHeight = boundingRect.height / 10;
          const [col, row] = [
            Math.floor(x / cellWidth),
            Math.floor(y / cellHeight),
          ];

          const clickedOnItem = items.find((item) =>
            item.positions.find((p) => p[0] === col && p[1] === row),
          );
          if (clickedOnItem) {
            if (editMode) {
              setPickedId(clickedOnItem.name);
            } else {
              window.open(clickedOnItem.url, "_blank", "noopener,noreferrer");
            }
          } else {
            setItems((items) => {
              const newItems = [...items];

              var arrayIndex = -1;
              newItems.map((e, i) => {
                if (e.name === pickedName) {
                  arrayIndex = i;
                  e.positions.push([col, row]);
                }
              });
              if (arrayIndex !== -1) {
                updateDashboardMutation.mutate({
                  dashboardId:
                    dashboardQuery.data?.[selectedDashboard]?._id ?? "",
                  itemId: items[arrayIndex]._id,
                  positions: items[arrayIndex].positions,
                  accessToken,
                });
              }
              return newItems;
            });
          }
        }}
      >
        {compiledData().map((item, i) => {
          const iconName = item.icon as LucideIconType;
          const Icon = (
            item.icon && Icons[iconName] ? Icons[iconName] : Icons.Circle
          ) as React.FC<React.SVGProps<SVGSVGElement>>;
          return (
            <div
              key={`${item.name} - ${i}`}
              style={{
                gridColumn: `span ${item.colSpan} / span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan} / span ${item.rowSpan}`,
                backgroundColor: item.color,
              }}
              className={cn(
                "relative rounded-lg text-center pointer-events-none content-center text-gray-50",
                item.name && "border border-black",
                editMode &&
                  item.name &&
                  "relative before:content-['↖'] before:absolute before:top-0 before:left-0 before:text-2xl before:text-black before:font-bold after:content-['↗'] after:absolute after:top-0 after:right-0 after:text-2xl after:text-black after:font-bold [&>div:last-child]:before:content-['↙'] [&>div:last-child]:before:absolute [&>div:last-child]:before:bottom-0 [&>div:last-child]:before:left-0 [&>div:last-child]:before:text-2xl [&>div:last-child]:before:text-black [&>div:last-child]:before:font-bold [&>div:last-child]:after:content-['↘'] [&>div:last-child]:after:absolute [&>div:last-child]:after:bottom-0 [&>div:last-child]:after:right-0 [&>div:last-child]:after:text-2xl [&>div:last-child]:after:text-black [&>div:last-child]:after:font-bold",
              )}
            >
              {item.name && editMode && (
                <Button
                  variant={"destructive"}
                  className="absolute top-1 right-1"
                  onClick={(e) => {
                    console.log("delete");
                  }}
                >
                  <Icons.Trash2 />
                </Button>
              )}
              <div className="flex items-center justify-center">
                <Icon />
                <div>{item.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
