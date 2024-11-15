"use client";

import { cn } from "@/utils";
import React, { useCallback, useEffect, useState } from "react";

type Position = [number, number];
type Item = {
  id: string;
  positions: Position[];
};

const compileData = (
  items: Item[],
): { rowSpan: number; colSpan: number; id?: string }[] => {
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
      indexes[y][x] = item.id;
    }
  }
  const result: { rowSpan: number; colSpan: number; id?: string }[] = [];
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
        console.log(current, y, x, rowSpan, colSpan);

        result.push({
          ...items.find((item) => item.id === current)!,
          rowSpan,
          colSpan,
        });
      } else {
        if (current === 0) {
          result.push({
            rowSpan: 1,
            colSpan: 1,
          });
        }
      }
    }
  }

  return result;
};

export default function Grid() {
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      positions: [
        [0, 0],
        [0, 1],
        [0, 2],
        [2, 0],
        [3, 0],
        [2, 1],
        [3, 1],
      ],
    },
    {
      id: "2",
      positions: [
        [1, 2],
        [2, 2],
        [3, 2],
      ],
    },
    {
      id: "3",
      positions: [
        [1, 0],
        [1, 1],
      ],
    },
  ]);
  const compiledData = useCallback(() => compileData(items), [items]);
  return (
    <div className="p-2 grid grid-cols-10 grid-rows-10 gap-2 h-screen w-screen">
      {compiledData().map((item, i) => (
        <div
          key={`${item.id} - ${i}`}
          style={{
            gridColumn: `span ${item.colSpan} / span ${item.colSpan}`,
            gridRow: `span ${item.rowSpan} / span ${item.rowSpan}`,
          }}
          className={cn(
            "rounded-lg text-center",
            item.id === undefined ? "bg-gray-400" : "bg-green-500",
          )}
        >
          {item.id}
        </div>
      ))}
    </div>
  );
}
