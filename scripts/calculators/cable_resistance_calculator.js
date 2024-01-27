import { cableResistanceTable } from "../data_tables/cable_resistance_table.js";

export function calculateResistanceOfCable(csa, cableLength) {
  return 0.001 * cableResistanceTable[csa] * cableLength
}