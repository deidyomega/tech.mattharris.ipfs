export async function loadImgURL(ipfs, cid, mime, name) {
  if (cid == "" || cid == null || cid == undefined) {
    return;
  }
  if (!ipfs) {
    return link("w3", cid, name);
  }
  try {
    const content = [];
    for await (const chunk of ipfs.cat(cid + "/" + name)) {
      content.push(chunk);
    }
    return URL.createObjectURL(new Blob(content, { type: mime }));
  } catch (e) {
    console.log(e);
    return link("w3", cid, name);
  }
}

function link(handler, cid, name) {
  if (handler == "w3") {
    return w3link(cid, name);
  }
  if (handler == "cf") {
    return cflink(cid, name);
  }
  return w3link(cid, name);
}

function w3link(cid, name) {
  return `https://${cid}.ipfs.w3s.link/${name}`;
}

function cflink(cid, name) {
  return "https://cloudflare-ipfs.com/ipfs/" + cid + "/" + name;
}
