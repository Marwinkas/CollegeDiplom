import PlayArrow from '@mui/icons-material/PlayArrow';
import Sliders from 'react-slick';
import Pause from '@mui/icons-material/Pause';
import CloudUpload from '@mui/icons-material/CloudUpload';
import MusicNote from '@mui/icons-material/MusicNote';
import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Container,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Slider,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Fade,
  Collapse,
} from '@mui/material';
import {
  SkipNext,
  SkipPrevious,
  VolumeUp,
  Search
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { useInitials } from '@/hooks/use-initials';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { type BreadcrumbItem, type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CopyLinkButton from './Buttons'; 
import { usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Главная',
        href: '/settings/profile',
    },
];

// Кастомная тема
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
    },
    secondary: {
      main: '#191414',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

interface Song {
  id: number;
  title: string;
  author: string;
  url: string;
  duration: number;
}

interface MusicProps {
  cards: Song[];
}

const Music: React.FC<MusicProps> = ({ cards  }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const filteredSongs = cards.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAudioFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };
  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    let number = 0;
    files.forEach((file, index) => {
        formData.append(`files[${index}]`, file); // или просто `files[]`
        number+=1;
      });
      formData.append('count', number);
    try {
      await Inertia.post(route('dashboard.post'), formData);
      setTitle('');
      setAuthor('');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (errors) {
      console.error('Upload error:', errors);
    }
  };

  const settings = {
    dots: true, // показывать точки для переключения слайдов
    infinite: true, // бесконечный цикл слайдов
    speed: 500, // скорость переключения
    slidesToShow: 1, // количество слайдов, показываемых одновременно
    slidesToScroll: 1, // количество слайдов для прокрутки
};

const getInitials = useInitials();
 const { auth } = usePage<SharedData>().props;
const handleCopyLink = (url: string) => {
  navigator.clipboard.writeText(url)
    .then(() => {
      console.log('Ссылка скопирована!');
    })
    .catch((err) => {
      console.error('Ошибка при копировании: ', err);
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="m-auto mb-8 w-200">
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block mb-1">Сообщение</label>
              <TextField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                multiline
              />
            </div>
            <div className="flex justify-between">
            <div className="flex gap-1">
            <div className="relative w-10 p-2 rounded bg-gray-800 border border-gray-700 cursor-pointer">
                <input
                    type="file"
                    accept="audio/*,video/*,image/*"
                    onChange={handleAudioFileChange}
                    ref={fileInputRef}
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center">
                    <AttachFileIcon className="w-5 h-5" />
                </div>
            </div>
            </div>
            <button
              type="submit"
              className="w-50 py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded transition"
            >
              Создать пост
            </button>
            </div>
          </form>
        </div>



        <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>

        {/* Список треков */}
        <TransitionGroup>
          {filteredSongs.map((video) => (
            <Card sx={{ maxWidth: 1000, marginBottom:"20px", borderRadius: "15px"}}>
            <CardHeader
              avatar={
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        
                <AvatarImage src={"http://127.0.0.1:8001/" + auth.user.photo} alt={auth.user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(auth.user.name)}
                </AvatarFallback>
              </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={video.author}
            />

            <CardContent>
              <div class="w-[90%] m-auto">
              <div class=" pb-4"><Typography variant="body" sx={{ color: 'text.secondary' }}>
                {video.title}
            </Typography></div>
            {video.imgurl &&  video.imgurl.split(',').length > 1 && <Sliders {...settings} class = "h-128 w-128 bg object-contain">
                {video.imgurl && video.imgurl.split(',').map((url, index) => (
                    <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        component="img"
                        image={url}
                        alt={`image-${index}`}
                    />
                ))}

            </Sliders>}
            {video.imgurl &&  video.imgurl.split(',').length == 1 &&  <CardMedia
                    class = "h-128 w-128 bg object-contain bg-black"
                    component="img"
                    image={video.imgurl}
                    sx={{width: "100%"}}
                />}
            {video.videourl && video.videourl.split(',').length > 1 && <Sliders {...settings} >
                {video.videourl && video.videourl.split(',').map((url, index) => (
                    <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        component="video"
                        image={url}
                        controls
                        alt={`image-${index}`}
                        sx={{marginTop: "10px", width: "100%"}}
                    />
                ))}
            </Sliders>}
            {video.videourl && video.videourl.split(',').length == 1 && <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        component="video"
                        image={video.videourl}
                        controls
                        sx={{marginTop: "10px"}}
                    />}
            {video.audiourl && video.audiourl.split(',').map((url, index) => (
                <CardMedia
                    component="audio"
                    image={url}
                    controls
                    sx={{marginTop: "10px"}}
                />
            ))}
              </div>
 
            </CardContent>
            <CardActions disableSpacing>
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>

              <a href={"http://127.0.0.1:8001/dashboard/"+ video.id}><IconButton><ChatBubbleIcon/></IconButton></a>
              <CopyLinkButton link={"http://127.0.0.1:8001/dashboard/"+ video.id} />
              <div className='ml-auto'></div>{new Date(video.created_at).toLocaleString()}
            </CardActions>
              </Card>


          ))}
        </TransitionGroup>
      </Container>
    </ThemeProvider>
    </AppLayout>
  );
};

export default Music;
