import { Field, useFormikContext } from "formik";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import { updateGroupName, deleteGroup } from "../api/group.api";

export default function GroupLine({ groupName, groupId }) {
  const { setFieldValue, values } = useFormikContext();

  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false);
    setFieldValue("group", groupName);
  };

  const handleEdit = async () => {
    if (values.group.trim() === "") {
      alert("Le nom du groupe ne peut pas être vide");
      return;
    }
    const response = await updateGroupName(values.group.trim(), groupId);
    if (response.status === 200) {
      setIsEditing(false);
      alert("Le nom du groupe a bien été modifié");
    }
  };

  const handleDelete = async () => {
    const response = await deleteGroup(groupId);
    if (response.status === 200) {
      alert("Le groupe a bien été supprimé");
      //Navigate to the same page to refresh the list of groups
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-row items-center w-full py-1 px-3">
      {!isEditing && (
        <>
          <p className="flex-grow text-black">{groupName}</p>
          <div className="flex flex-row ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className={`h-9 w-9 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
                isEditing
                  ? "bg-darkGray border-darkGray cursor-not-allowed"
                  : "border-black bg-black hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black"
              }`}
              title="Modifier le nom du groupe"
              disabled={isEditing}
            >
              <EditIcon className="h-6 w-6 self-center" />
            </button>
            <button
              onClick={() => handleDelete()}
              className={`h-9 w-9 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
                isEditing
                  ? "bg-darkGray border-darkGray cursor-not-allowed"
                  : "border-black bg-black hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black"
              }`}
              title="Supprimer un groupe"
              disabled={isEditing}
            >
              <DeleteIcon className="h-6 w-6 self-center" />
            </button>
          </div>
        </>
      )}
      {isEditing && (
        <>
          <Field
            name="group"
            placeholder="Nom du groupe"
            className="bg-transparent placeholder:text-placeholder flex-grow text-black underline"
          />
          <div className="flex flex-row ml-2">
            <button
              onClick={() => handleEdit()}
              className={`h-9 w-9 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
                !isEditing
                  ? "bg-darkGray border-darkGray cursor-not-allowed"
                  : "border-black bg-black hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black"
              }`}
              title="Valider les changements"
              disabled={!isEditing}
            >
              <DoneIcon className="h-6 w-6 self-center" />
            </button>
            <button
              onClick={() => handleCancel()}
              className={`h-9 w-9 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
                !isEditing
                  ? "bg-darkGray border-darkGray cursor-not-allowed"
                  : "border-black bg-black hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black"
              }`}
              title="Annuler les changements"
              disabled={!isEditing}
            >
              <CloseIcon className="h-6 w-6 self-center" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
