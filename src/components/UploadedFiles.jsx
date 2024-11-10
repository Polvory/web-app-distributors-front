import React, { useState } from "react";
import {
  FileInput,
  Cell,
  Button,
  Image,
  IconButton,
} from "@telegram-apps/telegram-ui";
import styled from "styled-components";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleUpload } from "../api/api";
import { uploadedStore } from "../stores/Uploaded";
import { observer } from "mobx-react-lite";

const StyledImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const StyledImagePrewie = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

const UploadedFiles = observer(({ tg_user_id, typeAddId, taskId }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const filesWithPreview = files.map((file) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    uploadedStore.setUploaded({
      tg_user_id: tg_user_id,
      typeAddId: typeAddId,
      taskId: taskId,
      files: filesWithPreview,
    });
    setUploadedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  };

  const handleRemoveFile = (index) => {
    uploadedStore.removeFileByIndex(typeAddId, index);
    setUploadedFiles((prevFiles) => {
      if (prevFiles[index].preview)
        URL.revokeObjectURL(prevFiles[index].preview);
      return prevFiles.filter((_, i) => i !== index);
    });
  };

  const UploadImage = async () => {
    await handleUpload(tg_user_id, typeAddId, taskId, uploadedFiles);
  };
  //

  return (
    <>
      {/* {tg_user_id}
      {typeAddId}
      {taskId} */}
      <FileInput label="Прикрепи файлы" multiple onChange={handleFileChange} />

      {uploadedFiles.length > 0 && (
        <StyledImagesWrapper>
          {uploadedFiles.map((fileObj, idx) => (
            <>
              <StyledImagePrewie>
                {fileObj?.preview && <Image size={48} src={fileObj.preview} />}
                <IconButton
                  mode="bezeled"
                  size="m"
                  onClick={() => handleRemoveFile(idx)}
                >
                  <FaRegTrashCan />
                </IconButton>
              </StyledImagePrewie>
            </>
          ))}
        </StyledImagesWrapper>
      )}
      {/* <Button mode="bezeled" onClick={() => UploadImage()}>
        Сохранить
      </Button> */}
    </>
  );
});

export default UploadedFiles;
