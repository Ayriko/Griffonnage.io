import Avatar from "../Avatar/Avatar";



const Player = ({username}: {username: string}) => {
    const classement = 1;
    const points = 25;
    return (
        <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
           <p> # {classement}</p>
            <p>{username}</p>
            <Avatar />
        </div>
        <div className="text-center text-sm text-gray-500">
            {points} points
        </div>

        </div>
        
    );
};

export default Player;