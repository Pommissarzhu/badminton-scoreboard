import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Button, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, TextField, List, ListItem, ListItemText } from '@mui/material';
import { ThemeContext } from './ThemeContext';

type ThemeSetting = 'system' | 'light' | 'dark';

interface Game {
  player1Score: number;
  player2Score: number;
  winner: string;
}

const Scoreboard: React.FC = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Games, setPlayer1Games] = useState(0);
  const [player2Games, setPlayer2Games] = useState(0);
  const [server, setServer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<string | null>(null);
  const { setThemeMode } = useContext(ThemeContext);
  const [themeSetting, setThemeSetting] = useState<ThemeSetting>('system');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameHistory, setGameHistory] = useState<Game[]>([]);
  const [winningScore, setWinningScore] = useState(21);
  const [gamesToWin, setGamesToWin] = useState(2);

  const handlePlayer1Score = () => {
    if (!winner) {
      setPlayer1Score(player1Score + 1);
      setServer(1);
    }
  };

  const handlePlayer2Score = () => {
    if (!winner) {
      setPlayer2Score(player2Score + 1);
      setServer(2);
    }
  };

  const handleReset = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Games(0);
    setPlayer2Games(0);
    setServer(1);
    setWinner(null);
    setGameHistory([]);
  };

  const handleThemeChange = (event: SelectChangeEvent<ThemeSetting>) => {
    const setting = event.target.value as ThemeSetting;
    setThemeSetting(setting);
    setThemeMode(setting);
  };

  const handleWinningScoreChange = (event: SelectChangeEvent<number>) => {
    setWinningScore(event.target.value as number);
  };

  const handleGamesToWinChange = (event: SelectChangeEvent<number>) => {
    setGamesToWin(event.target.value as number);
  };

  useEffect(() => {
    if (
      (player1Score >= winningScore && player1Score - player2Score >= 2) ||
      player1Score === winningScore + 9
    ) {
      setPlayer1Games(player1Games + 1);
      setGameHistory([...gameHistory, { player1Score, player2Score, winner: player1Name || '球员 1' }]);
      setPlayer1Score(0);
      setPlayer2Score(0);
    } else if (
      (player2Score >= winningScore && player2Score - player1Score >= 2) ||
      player2Score === winningScore + 9
    ) {
      setPlayer2Games(player2Games + 1);
      setGameHistory([...gameHistory, { player1Score, player2Score, winner: player2Name || '球员 2' }]);
      setPlayer1Score(0);
      setPlayer2Score(0);
    }
  }, [player1Score, player2Score, player1Games, player2Games, gameHistory, player1Name, player2Name, winningScore]);

  useEffect(() => {
    if (player1Games === gamesToWin) {
      setWinner(player1Name || '球员 1');
    } else if (player2Games === gamesToWin) {
      setWinner(player2Name || '球员 2');
    }
  }, [player1Games, player2Games, player1Name, player2Name, gamesToWin]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ textAlign: 'center' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
              羽毛球计分板
            </Typography>
            <FormControl size="small">
              <InputLabel>主题</InputLabel>
              <Select value={themeSetting} onChange={handleThemeChange} label="主题">
                <MenuItem value="system">跟随系统</MenuItem>
                <MenuItem value="light">浅色</MenuItem>
                <MenuItem value="dark">深色</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>获胜分数</InputLabel>
                <Select value={winningScore} onChange={handleWinningScoreChange} label="获胜分数">
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={21}>21</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>获胜局数</InputLabel>
                <Select value={gamesToWin} onChange={handleGamesToWinChange} label="获胜局数">
                  <MenuItem value={1}>一局一胜</MenuItem>
                  <MenuItem value={2}>三局两胜</MenuItem>
                  <MenuItem value={3}>五局三胜</MenuItem>
                  <MenuItem value={4}>七局四胜</MenuItem>
                  <MenuItem value={5}>九局五胜</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField placeholder="球员 1 名称" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField placeholder="球员 2 名称" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: server === 1 ? 'primary.main' : 'background.default' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {player1Name || '球员 1'}
                  </Typography>
                  <Typography variant="h1" component="div">
                    {player1Score}
                  </Typography>
                  <Button variant="contained" color="success" onClick={handlePlayer1Score} disabled={!!winner}>
                    +1
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: server === 2 ? 'primary.main' : 'background.default' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {player2Name || '球员 2'}
                  </Typography>
                  <Typography variant="h1" component="div">
                    {player2Score}
                  </Typography>
                  <Button variant="contained" color="success" onClick={handlePlayer2Score} disabled={!!winner}>
                    +1
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={6}>
              <Typography variant="h6">胜局: {player1Games}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">胜局: {player2Games}</Typography>
            </Grid>
          </Grid>
          {winner && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ color: 'success.main' }}>
                {winner} 赢得比赛!
              </Typography>
            </Box>
          )}
          <Button variant="contained" color="error" onClick={handleReset} sx={{ mt: 4 }}>
            新比赛
          </Button>
        </CardContent>
      </Card>
      {gameHistory.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5">比赛历史</Typography>
            <List>
              {gameHistory.map((game, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`第 ${index + 1} 局: ${game.winner} 获胜`} secondary={`${game.player1Score} - ${game.player2Score}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Scoreboard;
