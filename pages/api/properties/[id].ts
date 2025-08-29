import type { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import type { PropertyProps } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyProps | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  // Simulate API delay
  setTimeout(() => {
    // Find property by index (using id as array index for demo)
    const propertyIndex = parseInt(id as string);

    if (propertyIndex >= 0 && propertyIndex < PROPERTYLISTINGSAMPLE.length) {
      const property = PROPERTYLISTINGSAMPLE[propertyIndex];
      // Add an id field to the property for consistency
      const propertyWithId = { ...property, id: propertyIndex };
      res.status(200).json(propertyWithId);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  }, 300);
}
