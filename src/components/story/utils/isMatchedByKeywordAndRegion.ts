function isMatchedByKeywordAndRegion(
  title: string,
  content: string,
  keyword: string,
  region: string,
): boolean {
  if (keyword && region) {
    return title.includes(keyword) && content.includes(region);
  }
  if (keyword) {
    return title.includes(keyword);
  }
  if (region) {
    return content.includes(region);
  }
  return true;
}

export default isMatchedByKeywordAndRegion;
