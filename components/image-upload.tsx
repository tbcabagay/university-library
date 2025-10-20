"use client";

import config from "@/lib/config";
import { Image as IKImage, ImageKitProvider } from "@imagekit/next";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

const {
  env: {
    imagekit: { privateKey, publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const abortController = new AbortController();

  const handleUpload = async () => {};

  const handleError = (error: any) => {
    console.error(error);
  };

  const handleChange = () => {
    console.log(fileInputRef.current);
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input type="file" ref={fileInputRef} className="hidden" />
      Upload progress:{" "}
      <progress value={progress} max={100} className="w-full"></progress>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();

          if (fileInputRef.current) {
            fileInputRef.current?.click();
          }
        }}
        className="upload-btn bg-dark-300"
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          src={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
