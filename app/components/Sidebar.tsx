import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import {useState} from 'react'

const StyledContainer = styled.div`
  height: 100vh;
  min-height: 300px;
  max-width: 350px;
  overflow-y: auto;
  border-right: 1px solid whitesmoke;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  padding: 15px;
  position: sticky;
  top: 0;
  z-index: 1;
`;
const StyledSearch = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid whitesmoke;
`;
const StyledInputSearch = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;
const StyledButton = styled(Button)`
  width: 100%;
  border-bottom: 1px solid whitesmoke;
  font-weight: 600;
`;
const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const Sidebar = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("ERROR LOGOUT", error);
    }
  };

  const [user, loading, error] = useAuthState(auth);

  const [isOpenNewConversationDialog, setOpenNewConversationDialog] = useState(false)

  const [recipientEmail, setRecipientEmail] = useState('')

  const toggleNewConversationDialog = () => {
    setOpenNewConversationDialog(!isOpenNewConversationDialog)
  }

  const createConversation = () => {
    console.log(recipientEmail);
    toggleNewConversationDialog()

  }
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={user?.email}>
          <StyledUserAvatar />
        </Tooltip>

        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>

      <StyledSearch>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <StyledInputSearch placeholder="Search in conversations" />
      </StyledSearch>
      <StyledButton onClick={toggleNewConversationDialog}>start a new conversation</StyledButton>

      {/* dialog */}
      <Dialog open={isOpenNewConversationDialog} onClose={toggleNewConversationDialog}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat
            with
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Sidebar;
