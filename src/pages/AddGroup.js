import { useEffect, useState } from "react";

import Header from "../components/Header";
import Form from "../components/forms/Form";
import GroupField from "../components/forms/GroupField";
import { getGroupsForGame } from "../api/group.api";
const { useParams } = require("react-router-dom");

export default function AddGroup() {
  const { gameId } = useParams();
  const [groups, setGroups] = useState([]);

  const handleGetGroupsForGame = async (gameId) => {
    const response = await getGroupsForGame(gameId);
    setGroups(response.data.groups);
  };

  useEffect(() => {
    handleGetGroupsForGame(gameId);
  }, [gameId]);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="add-groups-page-container"
    >
      <Header pageTitle="Création de partie - Groupes participants" />
      <div className="self-center w-5/6">
        <Form
          initialValues={{
            group: "",
          }}
          onSubmit={(values) => console.log(values)}
        >
          <GroupField />
        </Form>
      </div>
      {groups.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold text-center">
            Aucun groupe n'a été trouvé pour cette partie
          </h1>
        </div>
      ) : (
        <div className="self-center">
          <h1 className="text-2xl font-bold text-center">
            Groupes participants
          </h1>
          <ul className="mt-4"></ul>
        </div>
      )}
    </div>
  );
}
