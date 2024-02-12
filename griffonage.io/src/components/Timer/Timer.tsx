import { useGameContext } from '../../contexts/GameContext';

const Timer = () => {

    const {seconds} = useGameContext();

  return (
    <div style={{ textAlign: 'center' }}>
        <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      <h1 style={{ color: 'white' }}>{seconds}</h1>
        </div>
    </div>
  );
};

export default Timer;
