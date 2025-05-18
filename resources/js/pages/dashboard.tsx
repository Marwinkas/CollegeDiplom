import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
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
  Avatar,
  Slider,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Fade,
  Collapse
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

import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { type BreadcrumbItem, type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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
  const handleFollowToggle2 = async (cardId: string) => {
  await Inertia.post(`/cards/${cardId}/like`);
};
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
const Music: React.FC<MusicProps> = ({ cards }) => {
    const filteredSongs = cards.filter((song) => song.title.toLowerCase());
    const getInitials = useInitials();
    const { auth } = usePage<SharedData>().props;

const Music: React.FC<MusicProps> = ({ cards  }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const filteredSongs = cards.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.author.toLowerCase().includes(searchQuery.toLowerCase())
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
        number += 1;
    });
    formData.append('count', number);
    formData.append('authorphoto',photo)
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
            <Card sx={{ maxWidth: 1000 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {video.author.charAt(0).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={video.author}
              subheader={new Date(video.created_at).toLocaleString()}
            />

            <CardContent>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
                {video.title}
            </Typography>
            {video.imgurl && <Sliders {...settings} >
                {video.imgurl && video.imgurl.split(',').map((url, index) => (
                    <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        key={index}
                        component="img"
                        image={url}
                        alt={`image-${index}`}
                    />
                ))}

            </Sliders>}
            {video.videourl && <Sliders {...settings} >
                {video.videourl && video.videourl.split(',').map((url, index) => (
                    <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        key={index}
                        component="video"
                        image={url}
                        alt={`image-${index}`}
                    />
                ))}

            </Sliders>}
            {video.audiourl && video.audiourl.split(',').map((url, index) => (
                <CardMedia
                    component="audio"
                    height="194"
                    image={url}
                    controls
                />
            ))}
            </CardContent>
            <CardActions disableSpacing>
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
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
