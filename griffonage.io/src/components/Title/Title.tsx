import { useEffect} from "react";

const Title = ({size} : {size : string}) => {

    useEffect(() => {
        const title = document.querySelector('.rainbow-text') as HTMLElement;
        let colors = ['#ffffff', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
        let count = 0;

        const changeColor = () => {
            title.style.color = colors[count];
            count = (count + 1) % colors.length;
        };

        const interval = setInterval(changeColor, 1000);

        return () => clearInterval(interval);
    }, []);



    return (
        <h1 className={`mb-8 font-inter rainbow-text ${size}`}>Griffonnage.io</h1>
    );
};

export default Title;
