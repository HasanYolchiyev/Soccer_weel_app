import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Sample teams with names, logos, and descriptions
const teams = [
  { name: 'Bayern', logo: 'https://path-to-bayern-logo.png', description: 'German football club based in Munich' },
  { name: 'PSG', logo: 'https://path-to-psg-logo.png', description: 'Paris-based club, dominant in French football' },
  { name: 'Real Madrid', logo: 'https://path-to-real-madrid-logo.png', description: 'Spanish club with rich history' },
  { name: 'Manchester United', logo: 'https://path-to-manchester-logo.png', description: 'English club with global fame' },
  // Add more teams as desired
];

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #f3f4f6;
  height: 100vh;
`;

const Circle = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-right: 20px;
  animation: ${keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `} 4s linear infinite;
`;

const TeamCard = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  transition: transform 0.3s;
  cursor: pointer;
  max-width: 300px;

  &:hover {
    transform: scale(1.05);
  }
`;

const TeamImage = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 10px;
`;

const SelectButton = styled.button`
  background-color: #ff3b3b;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const MatchList = styled.div`
  background-color: #e2e2e2;
  padding: 20px;
  margin-left: 20px;
  border-radius: 8px;
  width: 200px;
  height: 100vh;
  overflow-y: auto;
`;

const MatchItem = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  text-align: center;
`;

function TeamSelector() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [matches, setMatches] = useState([]);
  const [previousTeam, setPreviousTeam] = useState(null);

  const selectRandomTeam = () => {
    const randomIndex = Math.floor(Math.random() * teams.length);
    const team = teams[randomIndex];
    setSelectedTeam(team);

    // If there's a previous team, create a match and add it to the matches list
    if (previousTeam) {
      setMatches((prevMatches) => [
        ...prevMatches,
        { teamA: previousTeam, teamB: team }
      ]);
    }

    // Update the previous team to the newly selected team
    setPreviousTeam(team);
  };

  return (
    <AppContainer>
      <div>
        <Circle>
          <div>
            {selectedTeam ? (
              <>
                Seçilen Takım<br />
                {selectedTeam.name}
              </>
            ) : (
              'Takım Seçiliyor...'
            )}
          </div>
        </Circle>
        {selectedTeam && (
          <TeamCard>
            <h3>{selectedTeam.name}</h3>
            <p>{selectedTeam.description}</p>
            <TeamImage src={selectedTeam.logo} alt={`${selectedTeam.name} logo`} />
          </TeamCard>
        )}
        <SelectButton onClick={selectRandomTeam}>Rastgele Takım Seç</SelectButton>
      </div>
      <MatchList>
        <h4>Oluşan Maçlar</h4>
        {matches.map((match, index) => (
          <MatchItem key={index}>
            {match.teamA.name} vs {match.teamB.name}
          </MatchItem>
        ))}
      </MatchList>
    </AppContainer>
  );
}

export default TeamSelector;
