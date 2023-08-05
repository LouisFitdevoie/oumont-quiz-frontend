import { useEffect, useState } from "react";

import Header from "../components/Header";
import Form from "../components/forms/Form";
import GroupField from "../components/forms/GroupField";
import { getGroupsForGame, createGroup } from "../api/group.api";
import GroupLine from "../components/GroupLine";
import Button from "../components/Button";
const { useNavigate } = require("react-router-dom");
const { useParams } = require("react-router-dom");

export default function AddGroup() {
  const { gameId } = useParams();
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const handleGetGroupsForGame = async (gameId) => {
    const response = await getGroupsForGame(gameId);
    //Sort groups by name alphabetically ascending
    response.data.groups.sort((a, b) => {
      return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
    });
    setGroups(response.data.groups);
  };

  useEffect(() => {
    handleGetGroupsForGame(gameId);
  }, [gameId]);

  const handleCreateGroup = async (values) => {
    const response = await createGroup(values.group, gameId);
    if (response.status === 201) {
      handleGetGroupsForGame(gameId);
      values.group = "";
    }
  };

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
          onSubmit={(values) => handleCreateGroup(values)}
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
        <div className="self-center w-5/6">
          <h1 className="text-2xl font-bold text-center">
            Groupes participants
          </h1>
          {groups.map((group) => (
            <div
              className="px-4 mt-2 w-full flex flex-col items-center justify-start"
              key={group.id}
            >
              <Form
                initialValues={{
                  group: group.name,
                }}
              >
                <GroupLine groupName={group.name} groupId={group.id} />
              </Form>
              {groups[groups.length - 1].id !== group.id && (
                <div className="px-3 w-full">
                  <div className="h-px bg-darkGray mt-2" />
                </div>
              )}
            </div>
          ))}
          <Button
            title="Commencer la partie"
            onClick={() => navigate("/question/" + gameId)}
          />
        </div>
      )}
    </div>
  );
}
