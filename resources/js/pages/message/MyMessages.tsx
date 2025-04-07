import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Button,
  Card,
  Typography,
  Textarea,
  Input,
  Sheet,
  CssVarsProvider,
  extendTheme
} from '@mui/joy';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps } from '../types';
import { chats } from '../data';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

// Custom theme with black/green colors
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        neutral: {
          900: '#0a0a0a',
          800: '#262626',
          700: '#404040',
        },
      },
    },
  },
});

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

const MyProfile: React.FC<{
  users: { id: number; name: string }[];
  messages: { sender: { name: string }; receiver: { name: string }; content: string; created_at: string }[] | null;
}> = ({ users, messages }) => {
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [selectedSenderId, setSelectedSenderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/messages", { receiver_id: receiverId, content });
    setContent("");
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString("ru-RU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);

  const filteredMessages = selectedSenderId
    ? messages?.filter(
        (message) =>
          message.sender?.name === selectedSenderId ||
          message.receiver?.name === selectedSenderId
      )
    : messages;

  return (
    <CssVarsProvider theme={theme}>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Message" />
        
        <Sheet sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: 4,
          borderRadius: 'lg',
          boxShadow: 'md',
          bgcolor: 'neutral.900'
        }}>
          <Typography level="h2" sx={{ color: 'primary.700', mb: 4 }}>
            Отправить сообщение
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Sheet sx={{ 
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              mb: 4,
              p: 2,
              borderRadius: 'md',
              bgcolor: 'neutral.800'
            }}>
              <Typography sx={{ color: 'primary.200' }}>Получатель:</Typography>
              {users.map((user) => (
                <Button
                  key={user.id}
                  onClick={() => setReceiverId(user.id.toString())}
                  variant={receiverId === user.id.toString() ? 'solid' : 'outlined'}
                  color="primary"
                  sx={{
                    '&:hover': { boxShadow: '0 0 0 2px var(--joy-palette-primary-700)' }
                  }}
                >
                  {user.name}
                </Button>
              ))}
            </Sheet>

            <Textarea
              minRows={3}
              placeholder="Введите сообщение"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              sx={{
                bgcolor: 'neutral.800',
                borderColor: 'primary.700',
                color: 'primary.200',
                '&:focus-within': { borderColor: 'primary.500' }
              }}
            />

            <Button
              type="submit"
              fullWidth
              color="primary"
              sx={{
                bgcolor: 'primary.700',
                '&:hover': { bgcolor: 'primary.600' }
              }}
            >
              Отправить
            </Button>
          </form>

          <Sheet sx={{ 
            mt: 6,
            p: 3,
            borderRadius: 'md',
            bgcolor: 'neutral.800'
          }}>
            <Typography level="h3" sx={{ color: 'primary.500', mb: 3 }}>
              Фильтр сообщений
            </Typography>
            <Sheet sx={{ 
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              mb: 2
            }}>
              {users.map((user) => (
                <Button
                  key={user.id}
                  onClick={() => setSelectedSenderId(user.name)}
                  variant={selectedSenderId === user.name ? 'solid' : 'outlined'}
                  color="primary"
                  size="sm"
                >
                  {user.name}
                </Button>
              ))}
            </Sheet>
          </Sheet>

          <Sheet sx={{ mt: 4 }}>
            <Typography level="h3" sx={{ color: 'primary.500', mb: 3 }}>
              Сообщения
            </Typography>
            {Array.isArray(filteredMessages) && filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    bgcolor: 'neutral.800',
                    border: '1px solid',
                    borderColor: 'primary.700',
                    boxShadow: 'none'
                  }}
                >
                  <Sheet sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography level="body2" sx={{ color: 'primary.300' }}>
                      От: {message.sender?.name || 'Неизвестен'}
                    </Typography>
                    <Typography level="body2" sx={{ color: 'primary.400' }}>
                      {formatDate(message.created_at)}
                    </Typography>
                  </Sheet>
                  <Typography sx={{ color: 'primary.200' }}>
                    {message.content || 'Нет содержимого'}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography sx={{ color: 'primary.300' }}>Сообщений нет</Typography>
            )}
          </Sheet>
        </Sheet>
      </AppLayout>
    </CssVarsProvider>
  );
};

export default MyProfile;