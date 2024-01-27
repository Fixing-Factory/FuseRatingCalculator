import { fuseRatingTable } from "../data_tables/fuse_rating_table.js"

export function calculateFuseRating(csa, plugType, inrush, cableLength) {
  const short_lead = cableLength <= 2
  
  if (csa === "0.5" && inrush) {
    return fuseRatingTable[csa]["inrush"][plugType]
  } else if (csa === "0.75" && short_lead) {
    return fuseRatingTable[csa]["short_lead"][plugType]
  } else {
    return fuseRatingTable[csa]["standard"][plugType]
  }
}