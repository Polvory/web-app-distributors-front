import { Placeholder } from "@telegram-apps/telegram-ui";

const Home = () => {
  return (
    <>
      <Placeholder header="Title" description="Description">
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: "block", width: "144px", height: "144px" }}
        />
      </Placeholder>
    </>
  );
};

export default Home;
