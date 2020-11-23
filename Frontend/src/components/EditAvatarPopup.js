import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, reset }) {
  const avatarInputRef = React.useRef("");

  const editAvatarProps = {
    title: "Change profile picture",
    name: "profile-picture",
    inputPlaceholder2: "Image link",
    input2Type: "link",
    isOpen: isOpen,
    onClose: onClose,
    buttonText: "Save",
    disableButton: false,
    onSubmit: handleSubmit,
    refInput2: avatarInputRef,
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });

    e.target.reset();
  }

  return (
    <>
      <PopupWithForm {...editAvatarProps} />
    </>
  );
}

export default EditAvatarPopup;
