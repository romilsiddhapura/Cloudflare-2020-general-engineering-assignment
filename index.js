addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event));
});

const links=[
  {
    "name": "Portfolio ",
    "url": "https://personal.utdallas.edu/~rgs180004"
  },
  {
    "name": "Facebook Handle",
    "url": "https://www.facebook.com/romil.siddhapura/"
  },
  {
    "name": " Instagram Handle",
    "url": "https://www.instagram.com/romilsiddhapura/?hl=en"
  }
]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    links.forEach(link => {
      element.append(
        `<a href="${link.url}">${link.name}</a>`, 
        { html: true }
      );
    })
  }
}

class Title {
  async element(element) {
    element.setInnerContent("Romilkumar Siddhapura");
  }
}

class UserName {
  async element(element) {
    element.setInnerContent("Romilkumar Siddhapura");
  }
}

class Avatar {
  async element(element) {
    element.setAttribute("src", "https://i.ibb.co/4dRHW15/profile-img.jpg");
  }
}

class Profile {
  async element(element) {
    element.removeAttribute('style');
  }
}

class Social {
  async element(element) {
    element.removeAttribute('style');
    element.append("<a href=\"https://linkedin.com/in/romilsiddhapura/\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/61/61109.svg\"></a>", { html: true })
    element.append("<a href=\"https://github.com/romilsiddhapura/\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/37/37318.svg\"></a>", { html: true })
  }
}

class BackGround {
  async element(element) {
    element.setAttribute("class", "bg-green-700");
  }
}

async function handleRequest(event) {
  const url = new URL(event.request.url);
  let element = url.pathname.split("/").filter(n => n);

  if (element[0] === "links") {
    const json = JSON.stringify(links, null, 2);
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })

  } else{
    const headers = {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      },
    }
    const response = await fetch("https://static-links-page.signalnerve.workers.dev/", headers)

    return new HTMLRewriter()
      .on("div#links", new LinksTransformer())
      .on("div#profile", new Profile())
      .on("img#avatar", new Avatar())
      .on("h1#name", new UserName())
      .on("div#social", new Social())
      .on("title", new Title())
      .on("body", new BackGround())
      .transform(response);
  } 
}