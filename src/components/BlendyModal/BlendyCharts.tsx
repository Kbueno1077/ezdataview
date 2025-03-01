"use client";

import { Blendy, createBlendy } from "blendy";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getChartTypeByName } from "../resencharts-ui/utils/utils";
import BlendyModal from "./BlendyModal";

function BlendyCharts({ title, chart }: { title: string; chart: any }) {
  const blendy = useRef<Blendy | null>(null);
  const [showModal, setShowModal] = useState(false);
  const BLENDY_ID = title.toLowerCase().replace(" ", "-") + `-${chart.id}`;

  const chartNode = getChartTypeByName(chart.data, chart.type);

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });
  }, []);

  return (
    <div>
      {showModal &&
        createPortal(
          <BlendyModal
            title={title}
            blendyId={BLENDY_ID}
            onClose={() => {
              blendy.current?.untoggle(BLENDY_ID, () => {
                setShowModal(false);
              });
            }}
          >
            {chartNode}
          </BlendyModal>,
          document.body
        )}
      <div
        typeof="button"
        className="button"
        data-blendy-from={BLENDY_ID}
        onClick={() => {
          setShowModal(true);
          blendy.current?.toggle(BLENDY_ID);
        }}
      >
        <span>{title}</span>
        {chartNode}
      </div>
    </div>
  );
}

export default BlendyCharts;
