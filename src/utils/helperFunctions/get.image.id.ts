export function getImageIdFromLink(link: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const linkParts = link.split("/");
      const lastPart = linkParts[linkParts.length - 1];
      const id = lastPart.split(".")[0];
      resolve(id);
    } catch (error) {
      reject(error);
    }
  });
}
