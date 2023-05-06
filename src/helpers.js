export async function loadImgURL(ipfs, cid, mime, name) {
  if (cid == "" || cid == null || cid == undefined) {
    return;
  }
  if (!ipfs) {
    return "https://cloudflare-ipfs.com/ipfs/" + cid + "/" + name;
  }
  const content = [];
  for await (const chunk of ipfs.cat(cid + "/" + name)) {
    content.push(chunk);
  }
  return URL.createObjectURL(new Blob(content, { type: mime }));
}
