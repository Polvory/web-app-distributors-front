import React, { useEffect, useState } from "react";
import {
  Title,
  Text,
  IconButton,
  Button,
  Input,
} from "@telegram-apps/telegram-ui";
import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";
import ContentWrapper from "../components/ContentWrapper";
import { FaPen, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { EditeUser } from "../api/api";

const UsresSettings = observer(() => {
  const [edite, setEdite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userStore.user);

  const [editUser, setEditUser] = useState(userStore.user);

  useEffect(() => {
    setUser(userStore.user);
    setEditUser(userStore.user);
  }, [userStore.user]);

  const handelEdite = () => {
    setEdite(!edite);
  };

  const sendEdite = async () => {
    setLoading(true);
    let res = await EditeUser(editUser);
    if (res) {
      userStore.setUser(res);
      setLoading(false);
      setEdite(false);
    } else {
      setLoading(false);
    }
  };

  const UserPannel = () => {
    return (
      <>
        <Text weight="3">
          Профиль валидирован:{" "}
          {user?.validate_role ? (
            <FaRegCircleCheck />
          ) : (
            <FaRegCircleXmark color="var(--tgui--destructive_text_color)" />
          )}
        </Text>

        <Text weight="3">
          Ник: @{user?.tg_user_name ? user.tg_user_name : "Пусто"}
        </Text>
        <Text weight="3">
          Имя: {user?.full_name ? user.full_name : "Пусто"}
        </Text>
        <Text weight="3">
          Дата рождения: {user?.birth_date ? user.birth_date : "Пусто"}
        </Text>
        <Text weight="3">Роль: {user?.role ? user.role : "Пусто"}</Text>
        <Text weight="3">Телефон: {user?.phone ? user.phone : "Пусто"}</Text>
        <Text weight="3">Адрес: {user?.address ? user.address : "Пусто"}</Text>
      </>
    );
  };

  return (
    <>
      <ContentWrapper>
        {/* <Text weight="3">{JSON.stringify(user)}</Text> */}
        <Title level="1" weight="3">
          Профиль{" "}
          <IconButton mode="bezeled" size="m" onClick={() => handelEdite()}>
            {!edite ? <FaPen /> : <FaRegCircleXmark />}
          </IconButton>
        </Title>
        {!edite ? (
          <UserPannel />
        ) : (
          <>
            <Input
              disabled={loading}
              value={editUser.full_name}
              onChange={(e) =>
                setEditUser((prevUser) => ({
                  ...prevUser,
                  full_name: e.target.value,
                }))
              }
              header="Имя"
              placeholder="Введите имя"
            />
            <Input
              disabled={loading}
              value={editUser.birth_date}
              onChange={(e) =>
                setEditUser((prevUser) => ({
                  ...prevUser,
                  birth_date: e.target.value,
                }))
              }
              type="date"
              header="Дата рождения"
              placeholder="Формат 22-04-1994"
            />
            <Input
              disabled={loading}
              value={editUser.phone}
              onChange={(e) =>
                setEditUser((prevUser) => ({
                  ...prevUser,
                  phone: e.target.value,
                }))
              }
              header="Телефон"
              placeholder="+79150001122"
            />
            <Input
              disabled={loading}
              value={editUser.address}
              onChange={(e) =>
                setEditUser((prevUser) => ({
                  ...prevUser,
                  address: e.target.value,
                }))
              }
              header="Адрес"
              placeholder="Введите адрес"
            />

            <Button
              loading={loading}
              onClick={() => sendEdite()}
              mode="filled"
              size="m"
            >
              Сохранить
            </Button>
          </>
        )}

        {/* <code>{JSON.stringify(user)}</code> */}
        {/* <h1>UsresSettings</h1> */}
      </ContentWrapper>
    </>
  );
});

export default UsresSettings;
