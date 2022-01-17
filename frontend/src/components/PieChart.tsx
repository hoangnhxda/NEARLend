import { Pie, G2 } from "@ant-design/plots";
import { useEffect } from "react";

const PieChart = () => {
  const { registerTheme } = G2;

  const isMobile = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1000) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    isMobile();
  }, []);
  registerTheme("custom-theme", {
    colors10: [
      "#5586bf",
      "#bf504d",
      "#9abb59",
      "#8064a2",
      "#4aacc6",
      "#f79645",
      "#FF745A",
      "#007E99",
      "#FFA8A8",
      "#2391FF",
    ],
  });
  const G = G2.getEngine("canvas");
  const data = [
    {
      type: "PUBLIC SALES",
      value: 3,
    },
    {
      type: "PRIVATE SALES",
      value: 25,
    },
    {
      type: "RESERVE & TREASURY",
      value: 10,
    },
    {
      type: "LIQUIDITY MINING",
      value: 40,
    },
    {
      type: "TEAM & ADVISOR",
      value: 17,
    },
    {
      type: "PROTOCOL INCENTIVE & ECOSYSTEM",
      value: 5,
    },
  ];
  const cfg = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    legend: false,
    label: {
      autoHide: true,
      type: "spider",
      labelHeight: 40,
      formatter: (data: any, mappingData: any) => {
        const group = new G.Group({});
        group.addShape({
          type: "circle",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 10,
            y: 7,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 50,
            y: 25,
            text: `${data.value}%`,
            fill: "#fff",
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    theme: "custom-theme",
  };
  const cfg2 = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    legend: false,
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ value, type }: any) => `${value}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    theme: "custom-theme",
  };
  const config: any = isMobile() ? cfg2 : cfg;
  return <Pie {...config} />;
};

export default PieChart;
