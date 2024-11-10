import React, { useEffect, useState } from "react";
import { uploadedStore } from "../stores/Uploaded";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import {
  Title,
  Text,
  Button,
  Section,
  Caption,
  Modal,
} from "@telegram-apps/telegram-ui";
import ContentWrapper from "./ContentWrapper";
import UploadedFiles from "./UploadedFiles";
import { handleUpload } from "../api/api";

const StyledCardTask = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 32px 64px 0 rgba(0, 0, 0, 0.04), 0 0 2px 1px rgba(0, 0, 0, 0.02);
  background: var(--tgui--card_bg_color));
  flex-direction: column;
    row-gap: 0.5rem;
`;

const CardTask = observer(({ state, tg_user_id }) => {
  const [open, setOpen] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  async function uploadFiles(files) {
    try {
      setLoadingSend(true);
      // Используем Promise.all для загрузки всех файлов одновременно
      const uploadPromises = files.map((file) => {
        if (file.files.length) {
          // gUserId, typeAddId, taskId, uploadedFiles
          return handleUpload(
            file.tg_user_id,
            file.typeAddId,
            file.taskId,
            file.files
          );
        }
      });
      const results = await Promise.all(uploadPromises);
      if (results) {
        setLoadingSend(false);
      }
      console.log("All files uploaded successfully:", results);
    } catch (error) {
      setLoadingSend(false);

      console.error("Error uploading files:", error);
    }
  }

  return (
    <>
      <StyledCardTask>
        <Caption level="1" weight="3">
          id: {state.id}
        </Caption>
        <Caption level="1" weight="3">
          Автор: @{state.creator.tg_user_name}
        </Caption>
        <Title level="3" weight="1">
          Адрес: {state.address}
        </Title>
        <hr
          style={{ color: "var(--tgui--secondary_hint_color)", width: "100%" }}
        />
        {state.typeAdds.map((element, index) => {
          return (
            <>
              <Text weight="1">{element.name}</Text>
              <Text weight="3">{element.descripton}</Text>
            </>
          );
        })}
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Начать выполнение
        </Button>
        <Modal
          onOpenChange={(open) => {
            setOpen(open);
            if (!open) uploadedStore.clearAll();
          }}
          open={open}
        >
          <Section footer="Версия: s1.0.1" header="Выполнение таски">
            <ContentWrapper>
              <code>{JSON.stringify(uploadedStore.data)}</code>

              {state.typeAdds.map((element, index) => {
                return (
                  <>
                    <Text weight="1">{element.name}</Text>
                    <Text weight="3">{element.descripton}</Text>

                    <UploadedFiles
                      tg_user_id={tg_user_id}
                      typeAddId={element.id}
                      taskId={state.id}
                    />
                  </>
                );
              })}
              <Button
                loading={loadingSend}
                onClick={() => {
                  uploadFiles(uploadedStore.data);
                }}
              >
                Отправить
              </Button>
            </ContentWrapper>
          </Section>
        </Modal>
      </StyledCardTask>
    </>
  );
});
export default CardTask;
