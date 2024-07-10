import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Card = ({id, object}) =>  {
    const {attributes,listeners,setNodeRef,transform,transition}= useSortable({id})
    const style = {transition,transform: CSS.Transform.toString(transform)}
    return (
        // <div key={card.id}>{card.object}</div>
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {object}
        </div>
    )
}