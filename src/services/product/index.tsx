

export const getData = async (url: string) => {
    const res = await fetch(url, {
        next:{
            tags: ["product"],
        }
    });
    
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
