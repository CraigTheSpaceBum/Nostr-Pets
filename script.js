// Public key (npub) of the user to fetch data for
const npub = "npub1826v365he5ty69lk3xgvzqrwy8587vdfrxnsz0k09khzustf8r7s6j7t95";
const relayUrl = "ws://relay.damus.io";

// Decode npub to hex public key using nip19
function decodeNpub(npub) {
    const { nip19 } = window.nostrTools;
    return nip19.decode(npub).data;
}

// Fetch profile metadata and user feed
async function fetchUserData() {
    const pubkeyHex = decodeNpub(npub);
    const relay = new WebSocket(relayUrl);

    relay.onopen = () => {
        console.log("Connected to relay");

        // Request profile metadata (NIP-02)
        relay.send(JSON.stringify(["REQ", "profile", {
            "kinds": [0],
            "authors": [pubkeyHex]
        }]));

        // Request user's posts (NIP-01)
        relay.send(JSON.stringify(["REQ", "posts", {
            "kinds": [1],
            "authors": [pubkeyHex],
            "limit": 10
        }]));
    };

    relay.onmessage = (event) => {
        const [type, , data] = JSON.parse(event.data);

        if (type === "EVENT") {
            if (data.kind === 0) {
                // Process profile metadata
                const metadata = JSON.parse(data.content);
                document.getElementById("username").textContent = metadata.name || "Unknown User";
                document.getElementById("bio").textContent = metadata.about || "No bio available.";
                document.getElementById("profile-picture").src = metadata.picture || "default-profile.png";
                document.getElementById("banner").src = metadata.banner || "default-banner.png";
            } else if (data.kind === 1) {
                // Process user posts
                const postElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerHTML = `<p>${data.content}</p>`;
                document.getElementById("posts").appendChild(postElement);
            }
        }
    };

    relay.onclose = () => {
        console.log("Disconnected from relay");
    };

    relay.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
}

// Initialize fetching
fetchUserData();
