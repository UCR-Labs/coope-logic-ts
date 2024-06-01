import axios from "axios";

export async function geocode(location: string, apiKey: string): Promise<any> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&key=${apiKey}&language=es`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Error while fetching geocode data: " + errorMessage);
  }
}
