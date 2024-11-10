import React, { useEffect, useState } from "react";
import { userStore } from "../stores/UserStore";
import { GetExecutorTasks } from "../api/api";
import { autorun } from "mobx";
import CardTask from "../components/CardTask";
import ContentWrapper from "../components/ContentWrapper";
import { Spinner } from "@telegram-apps/telegram-ui";
const TaskUser = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handelGetTasks = async () => {
    setLoading(true);
    if (userStore.user?.tg_user_id) {
      let res = await GetExecutorTasks(userStore.user.tg_user_id, completed);
      if (res) {
        setTasks(res);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const dispose = autorun(() => {
      if (userStore.user?.tg_user_id) {
        handelGetTasks();
      }
    });

    return () => dispose(); // очистка autorun при размонтировании компонента
  }, []);

  return (
    <>
      <ContentWrapper>
        {loading ? (
          <Spinner size="m" />
        ) : (
          <>
            {tasks.map((element, index) => {
              return (
                <CardTask
                  state={element}
                  key={index}
                  tg_user_id={userStore.user?.tg_user_id}
                />
              );
            })}
          </>
        )}

        {/* {JSON.stringify(tasks)} */}
      </ContentWrapper>
    </>
  );
};

export default TaskUser;
