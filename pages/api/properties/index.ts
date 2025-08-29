import type { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import type { PropertyProps } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyProps[]>
) {
  if (req.method !== "GET") {
    return res.status(405).json([]);
  }

  // Simulate API delay for better UX
  setTimeout(() => {
    res.status(200).json(PROPERTYLISTINGSAMPLE);
  }, 500);
}
