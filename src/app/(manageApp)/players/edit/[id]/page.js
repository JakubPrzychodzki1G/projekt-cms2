import PlayerData from "../../components/PlayerData";

export default function Page ({params: {id}}) {

    return (
        <PlayerData id={id} isReadOnly={false} name="Edytuj Zawodnika"/>
    )
}