import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tabbar,
  Section,
  Cell,
  ButtonCell,
  Modal,
} from "@telegram-apps/telegram-ui";
import { RxCrossCircled } from "react-icons/rx";
import { LuUser, LuBrain } from "react-icons/lu";
import { LuMenu } from "react-icons/lu";
import {
  HOME_PATH,
  TYPE_ADD,
  TASK_ADMIN,
  TASK_USER,
  USRES_SETTINGS,
  ADRESSES_SETTINGS,
} from "../constants/routes";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/UserStore";
import { ADMIN, USER } from "../constants/roles";
import {
  FaCube,
  FaRegAddressBook,
  FaWpforms,
  FaMapLocation,
} from "react-icons/fa6";

const Menu = observer(() => {
  const [user, setUser] = useState(userStore.user);
  const location = useLocation();
  const [path, setPath] = useState(HOME_PATH);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const goToContact = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setUser(userStore.user);
  }, [userStore.user]);

  useEffect(() => {
    console.log(
      "URL изменился:",
      location.pathname + location.search + location.hash
    );
    setPath(location.pathname);
  }, [location]);

  // Функция для проверки наличия пользователя и его роли
  const isUserRole = (role) => user && user.role === role;

  return (
    <>
      <div style={{ position: "absolute", zIndex: "2" }}>
        <Tabbar>
          <Tabbar.Item
            text="Главная"
            onClick={() => goToContact(HOME_PATH)}
            selected={path === HOME_PATH}
          >
            <FaCube size={16}></FaCube>
          </Tabbar.Item>
          <Tabbar.Item
            text="Меню"
            onClick={() => setOpen(true)}
            selected={open}
          >
            <LuMenu size={16}></LuMenu>
          </Tabbar.Item>
          <Modal onOpenChange={(open) => setOpen(open)} open={open}>
            <Section footer="Версия: s1.0.1" header="Меню">
              <ButtonCell
                before={<RxCrossCircled size={24} />}
                onClick={() => {
                  setOpen(false);
                }}
                interactiveAnimation="background"
                mode="destructive"
              >
                Закрыть
              </ButtonCell>
              {isUserRole(ADMIN) && (
                <>
                  <Cell
                    before={<FaCube size={24} />}
                    hovered={path === TASK_ADMIN}
                    onClick={() => {
                      goToContact(TASK_ADMIN);
                      setOpen(false);
                    }}
                  >
                    Задачи
                  </Cell>
                  <Cell
                    before={<FaMapLocation size={24} />}
                    hovered={path === ADRESSES_SETTINGS}
                    onClick={() => {
                      goToContact(ADRESSES_SETTINGS);
                      setOpen(false);
                    }}
                  >
                    Адреса
                  </Cell>
                  <Cell
                    before={<FaWpforms size={24} />}
                    hovered={path === TYPE_ADD}
                    onClick={() => {
                      goToContact(TYPE_ADD);
                      setOpen(false);
                    }}
                  >
                    Типы рекламы
                  </Cell>
                </>
              )}

              {isUserRole(USER) && (
                <>
                  <Cell
                    before={<FaCube size={24} />}
                    hovered={path === TASK_USER}
                    onClick={() => {
                      goToContact(TASK_USER);
                      setOpen(false);
                    }}
                  >
                    Задачи
                  </Cell>
                </>
              )}
              <Cell
                before={<LuUser size={24} />}
                hovered={path === USRES_SETTINGS}
                onClick={() => {
                  goToContact(USRES_SETTINGS);
                  setOpen(false);
                }}
              >
                Профиль
              </Cell>
            </Section>
          </Modal>
        </Tabbar>
      </div>
    </>
  );
});
export default Menu;
