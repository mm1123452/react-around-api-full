import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
  const [title, setTitle] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: title,
      link: imageLink,
    });
    e.target.reset();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleImageChange = (e) => {
    setImageLink(e.target.value);
  }

  const addPlaceProps = {
    title: "New Place",
    name: "add-place",
    inputPlaceholder1: "Title",
    inputPlaceholder2: "Image link",
    input2Type:"link",
    isOpen: isOpen,
    onClose: onClose,
    buttonText: "Create",
    disableButton: false,
    onSubmit: handleSubmit,
    onInputChange1: handleTitleChange,
    onInputChange2: handleImageChange
  };

  return (
    <>
      <PopupWithForm {...addPlaceProps} />
    </>
  );
}

export default AddPlacePopup;
