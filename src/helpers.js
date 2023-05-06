export async function loadImgURL(cid, name) {
  if (cid == "" || cid == null || cid == undefined) {
    return;
  }

  name = encodeURIComponent(name);

  return {
    local: locallink(cid, name),
    w3: w3link(cid, name),
    cf: cflink(cid, name),
  };
}

// async function ipfsLoad(ipfs_client, cid, mime, name) {
//   try {
//     const content = [];
//     for await (const chunk of ipfs_client.cat(cid + "/" + name)) {
//       content.push(chunk);
//     }
//     return URL.createObjectURL(new Blob(content, { type: mime }));
//   } catch (e) {
//     console.log(e);
//     return link("w3", cid, name);
//   }
// }

// function link(handler, cid, name) {
//   if (handler == "w3") {
//     return w3link(cid, name);
//   }
//   if (handler == "cf") {
//     return cflink(cid, name);
//   }
//   if (handler == "local") {
//     return locallink(cid, name);
//   }
//   return w3link(cid, name);
// }

function w3link(cid, name) {
  return `https://${cid}.ipfs.w3s.link/${name}`;
}

function cflink(cid, name) {
  return "https://cloudflare-ipfs.com/ipfs/" + cid + "/" + name;
}
function locallink(cid, name) {
  return `http://${cid}.ipfs.localhost:8080/${name}`;
}
