"use server";

export const submitGenReq = async (prompt: string, aspectRatio: string) => {
  let width, height;
  const [w, h] = aspectRatio.split(":").map(Number);
  if (w > h) {
    width = 512;
    height = Math.round((512 * h) / w);
  } else {
    height = 512;
    width = Math.round((512 * w) / h);
  }

  console.log("Generating image with width:", width, "height:", height);

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width, height },
        }),
      }
    );
    console.log("api key: ", process.env.NEXT_PUBLIC_HGFACE_TOKEN);
    console.log("Response for image generation: ", response);

    if (!response.ok) {
      throw new Error("Failed to generate image from the server");
    }
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error("Error generating image: ", error);
    throw error;
  }
};
