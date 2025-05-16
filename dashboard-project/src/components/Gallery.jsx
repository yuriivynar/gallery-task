import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Gallery({ userId }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        console.error(error);
        return;
      }
      setPhotos(data);
    };
    fetchPhotos();
  }, [userId]);

  return (
    <div className="grid grid-cols-auto-fill-min-250px gap-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={`${supabase.storage.from("user-photos").getPublicUrl(photo.path).data.publicUrl}`}
          alt="User upload"
          className="w-full h-48 object-cover rounded"
        />
      ))}
    </div>
  );
}