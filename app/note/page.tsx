'use client';

import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { useState, useEffect } from "react";
import { imageFileToBase64 } from "@/utils/imageToBase64";
import { fetchAvatar } from "./test";
import { createClient } from "@/utils/supabase/client";

export default function Tests() {

  const [image, setImage] = useState<string | null>(null);

  const [avatars, setAvatars] = useState<any[] | null>([]);
  useEffect(() => {
    const fetchAvatars = async () => {
      const supabase = createClient();
      let { data: avatars, error } = await supabase
      .from('avatars')
      .select();
      
      if (error) return console.log(error);
      setAvatars(avatars);
    }
    fetchAvatars();
  } ,[]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await imageFileToBase64(file);
      result && console.log(result);
      setImage(result);
    }
  }

  return (
    <div>
      <h1>Tests</h1>
      <Input 
        type="file" 
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleImage} 
      />
      {image && <Image src={image} alt="image" width={200} height={200} />}
      <div>
        {avatars && avatars.map((avatar, index) => (
          <div key={index}>
            <Image src={avatar.avatar_base64} alt="avatar" width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
}