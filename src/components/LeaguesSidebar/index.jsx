import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useTheme } from "../../context/ThemeContex";
import useFetchCompetitions from "../../hooks/useFetchCompetitions";
import useCompetitionStore from "../../store/useCompetitionStore";

import "../style.css";

const LeaguesSidebar = () => {
  const { competitions } = useFetchCompetitions();
  const { theme } = useTheme();
  const { selectedCompetitionId, setSelectedCompetitionId } = useCompetitionStore();

  const handleSelect = (id) => {
    if (selectedCompetitionId !== id) {
      setSelectedCompetitionId(id);
    }
  };

  return (
    <Box className={`sidebar ${theme.name === "dark" ? "dark" : ""}`}>
      <Typography variant="h5" fontWeight="bold" className="sidebar__title">
        Leagues
      </Typography>

      <List disablePadding>
        {competitions.length > 0 ? (
          competitions.map((comp) => (
            <ListItem
              key={comp.id}
              className={`sidebar__item ${
                selectedCompetitionId === comp.id ? "sidebar__item--selected" : ""
              }`}
              onClick={() => handleSelect(comp.id)}
              style={{ cursor: "pointer" }}
            >
              <ListItemAvatar>
                <Box
                  className={`sidebar__logo-wrapper ${theme.name === "dark" ? "dark" : ""}`}
                >
                  <img
                    src={comp.emblem}
                    alt="league logo"
                    width={30}
                    height={30}
                    style={{ filter: theme.name === "dark" ? "invert(1)" : "" }}
                  />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    className={`sidebar__text ${
                      selectedCompetitionId === comp.id ? "selected" : ""
                    }`}
                  >
                    {comp.name} ({comp.area.name})
                  </Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <Box className={`sidebar__empty ${theme.name === "dark" ? "dark" : ""}`}>
            <SentimentDissatisfiedIcon className="sidebar__empty-icon" />
            <Typography variant="body1" fontWeight={500}>
              Hozircha mavjud ligalar topilmadi
            </Typography>
            <Typography variant="body2" fontSize={13}>
              Iltimos, internet aloqangizni tekshiring yoki keyinroq urinib ko‘ring. So‘rovlar soni
              oshib ketgan bo‘lishi mumkin.
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default LeaguesSidebar;
