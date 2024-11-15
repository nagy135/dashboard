"use client";

import { getAllDashboards } from "@/api";
import { cn } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

type Position = [number, number];
type Item = {
  name: string;
  url: string;
  color: string;
  positions: Position[];
};

const compileData = (
  items: Item[],
): { rowSpan: number; colSpan: number; name?: string; color: string }[] => {
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

export default function Grid() {
  const [pickedName, setPickedId] = useState<string | undefined>(undefined);
  const dashboardQuery = useQuery({
    queryKey: ["dashboards"],
    queryFn: getAllDashboards,
  });

  const queryItems = dashboardQuery.data?.[0]?.items ?? [];

  const [items, setItems] = useState<Item[]>(queryItems as Item[]);

  const compiledData = useCallback(() => compileData(items ?? []), [items]);

  useEffect(() => {
    setItems((dashboardQuery.data?.[0]?.items ?? []) as Item[]);
  }, [dashboardQuery.data]);

  return (
    <div
      className="p-2 grid grid-cols-10 grid-rows-10 gap-2 h-screen w-screen"
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
        if (clickedOnItem) setPickedId(clickedOnItem.name);
        else {
          setItems((items) => {
            const newItems = [...items];
            newItems.map((e) => {
              if (e.name === pickedName) {
                e.positions.push([col, row]);
              }
            });
            return newItems;
          });
        }
      }}
    >
      {compiledData().map((item, i) => (
        <div
          key={`${item.name} - ${i}`}
          style={{
            gridColumn: `span ${item.colSpan} / span ${item.colSpan}`,
            gridRow: `span ${item.rowSpan} / span ${item.rowSpan}`,
            backgroundColor: item.color,
          }}
          className={cn("rounded-lg text-center pointer-events-none")}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
