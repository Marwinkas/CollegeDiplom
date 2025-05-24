import PlayArrow from '@mui/icons-material/PlayArrow';
import Sliders from 'react-slick';
import Pause from '@mui/icons-material/Pause';
import CloudUpload from '@mui/icons-material/CloudUpload';
import MusicNote from '@mui/icons-material/MusicNote';
import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
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
import cardCameraBackIcon from '@mui/icons-material/cardCameraBack';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePage } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Главная',
    href: '/settings/profile',
  },
];
interface Comment {
  id: number;
  user: {
    name: string;
    photo?: string;
  };
  body: string;
  created_at: string;
}

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
  authorphoto: string;
  url: string;
  duration: number;
  imgurl?: string;
  videourl?: string;
  audiourl?: string;
  created_at: string;
  comments: Comment[];
}

interface MusicProps {
  card: Song;
}

const Music: React.FC<MusicProps> = ({ card, comments, recentCards,randomCards,count,like,subscriber,subscribercount }) => {
  const getInitials = useInitials();
   const [subscribed, setSubscribed] = useState(subscriber);
  const [subscribersCount, setSubscribersCount] = useState(subscribercount);

  const [checked, setChecked] = useState(like);
  const { auth } = usePage<SharedData>().props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
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
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

  const handleFollowToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const path = window.location.pathname; // '/cards/2'
  const cardId = path.split('/')[2];     // '2'
  await Inertia.post(`/cards/${cardId}/like`);
  };

  const handleFollowToggle2 = async (cardId: string) => {
  await Inertia.post(`/cards/${cardId}/like`);
};

const handleFollowToggle3 = async (targetUserId: string) => {
  await Inertia.post(`/subscriptions/toggle/${targetUserId}`);
}; 

  const settings = {
    dots: true, // показывать точки для переключения слайдов
    infinite: true, // бесконечный цикл слайдов
    speed: 500, // скорость переключения
    slidesToShow: 1, // количество слайдов, показываемых одновременно
    slidesToScroll: 1, // количество слайдов для прокрутки
    
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: i => (
      <div
        style={{
          width: "30px",
          color: "white",
          border: "1px white solid"
        }}
      >
        {i + 1}
      </div>
    )
  };

  const { data, setData, reset, post } = useForm({
    card_id: card.id,
    body: '',
  });

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
        
        <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>

          {/* Список треков */}
  
            <Card sx={{ maxWidth: 1200, marginBottom: "20px", borderRadius: "15px",width:"100%", padding:"24px"}}>


              <CardContent sx={{ maxWidth: 1000,width:"100%"}} >
                <div class="w-full">

                  {card.imgurl && card.imgurl.split(',').length > 1 && <Sliders {...settings} class="h-128 w-128 bg object-contain">
                    {card.imgurl && card.imgurl.split(',').map((url, index) => (
                      <CardMedia
                        class="h-full mw-full bg object-contain bg-black max-h-128 w-full"
                        component="img"
                        image={url}
                      />
                    ))}

                  </Sliders>}

                  {card.imgurl && card.imgurl.split(',').length == 1 && <CardMedia
                    class="h-128 w-full bg object-contain bg-black"
                    component="img"
                    image={card.imgurl}
                    sx={{ width: "100%" }}
                  />}
                  {card.videourl && card.videourl.split(',').length > 1 && <Sliders {...settings} >
                    {card.videourl && card.videourl.split(',').map((url, index) => (
                         <CardMedia
                        class="h-128 w-128 bg object-contain bg-black"
                        component="video"
                        controls
                        image={url}
                      />
                    ))}
                  </Sliders>}
                   {card.videourl && card.videourl.split(',').length == 1 && <CardMedia
                    class="h-128 w-full bg object-contain bg-black"
                    component="video"
                    image={card.videourl}
                    controls
                    sx={{ marginTop: "10px" }}
                  />}
                  {card.audiourl && card.audiourl.split(',').map((url, index) => (
                    <CardMedia
                      component="audio"
                      image={url}
                      controls
                      sx={{ marginTop: "10px" }}
                    />
                  ))}
                </div>
                <div className='flex items-center flex-wrap mt-5'>
                  <Typography variant="body" sx={{ color: 'text.secondary' }}>
                    {new Date(card.created_at).toLocaleString()}
                  </Typography>
                  <div className='ml-auto'></div>
                      { auth.user && <Checkbox
                        checked={checked}
                        onChange={handleFollowToggle}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />}
                  <Typography variant="body" sx={{ color: 'text.secondary' }}>
                    {count}
                  </Typography>
                  <CopyLinkButton link={"http://sonzaiigi.art/dashboard/" + card.id} />
                </div>
                <div><Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  {card.title}
                </Typography></div>
              </CardContent>
              <CardHeader

                title={
                  <div>
                    <div class="flex flex-wrap">
                    <a href={"/profile/"+ card.user.id} class="flex">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage src={"http://sonzaiigi.art/" + card.user.photo} alt={card.user.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(card.user.name)}
                    </AvatarFallback>
                  </Avatar>
                      <p class="ml-5">{card.user.name}</p>
                     </a>
                          { auth.user && <Button
                            type="button"
                            variant="contained"
                            sx={{ marginLeft: "20px", color: "white", fontWeight: "600" }}
                            onClick={async () => await handleFollowToggle3(card.user.id)}
                          >
                            {subscribed ? "Unfollow" : "Follow"} ({subscribersCount})
                          </Button>}
                    </div>
                    <div class="flex flex-wrap">
                      {recentCards.map((video) => (
                        <Card
                          sx={{
                            marginTop:"20px",
                            marginRight:"10px",
                            borderRadius: '15px',
                            width: '150px',
                            height: '150px',
                            transition: 'opacity 0.3s',
                            '&:hover': {
                              opacity: 0.8,
                            },
                          }}
                          className="bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${video.imgurl.split(',')[0]})` }}
                        >
                          <CardContent className=" h-25">
                            <a href={'http://sonzaiigi.art/dashboard/' + video.id}>
                              <div className="h-full"></div>
                            </a>
                          </CardContent>
                          <CardActions disableSpacing>
                            { auth.user &&<Checkbox checked={video.liked} onChange={async () => await handleFollowToggle3(video.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                            <p  className="outlined-text">{video.title}</p>
                          </CardActions>
                        </Card>
                      ))}</div>
                  </div>}
              />
              <CardActions disableSpacing>

              </CardActions>
            </Card>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Комментарии</Typography>
              
              { auth.user &&<form onSubmit={(e) => {
                e.preventDefault();
                post(route('comments.store'), {
                  onSuccess: () => reset('body')
                });
              }}>
                <Box className="flex mt-3">
                  <Avatar className="h-11 w-11 overflow-hidden rounded-full  mr-2.5 mt-2">
                    <AvatarImage src={"http://sonzaiigi.art/" + auth.user.photo} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <TextField
                    fullWidth
                    multiline
                    rows={1}
                    variant="outlined"
                    placeholder="Оставить комментарий..."
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    className='h-16'
                  />
                  <Button type="submit" variant="contained" sx={{ marginLeft: "10px" }} className='h-13 mt-5'>Отправить</Button>
                </Box>
                <input type="hidden" name="song_id" value={card.id} />
              </form>}

              <List>
                {comments.map((comment) => (
                  <ListItem key={comment.id} sx={{ justifyContent: "flex-start", padding: "0" }}>
                    <Avatar className="h-11 w-11 overflow-hidden rounded-full  mr-2.5 mt-2">
                      <AvatarImage src={"http://sonzaiigi.art/" + comment.user.photo} />
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(comment.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <ListItemText
                      primary={`${comment.user.name} • ${new Date(comment.created_at).toLocaleString()}`}
                      secondary={comment.body}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
        </Container>

        <Container maxWidth="md" sx={{ py: 4}}>
        <Typography variant="h4" gutterBottom>Похожие Работы</Typography>
        <div className="flex flex-wrap">
                      {randomCards.map((video) => (
                        <Card
                                sx={{
                                    marginBottom: '20px',
                                    borderRadius: '15px',
                                    width: '200px',
                                    height: '250px',
                                    transition: 'opacity 0.3s',
                                    padding:"0",
                                    '&:hover': {
                                        opacity: 0.8,
                                    },
                                }}
                            >
                                <a href={"/profile/"+ video.user.id} class="flex items-center pb-2 pt-2">
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full  ml-1">
                                        <AvatarImage src={"http://sonzaiigi.art/" + video.user.photo} alt={video.user.name} />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(video.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                        <p class="ml-5">{video.user.name}</p>
                                        </a>
                                <CardContent sx={{
                                    padding:"0",
                                }}>
                                    <a href={'http://sonzaiigi.art/dashboard/' + video.id}>
                                        <img src={video.imgurl.split(',')[0]} width="200px" class="h-40"></img>
                                    </a>
                                </CardContent>
                                
                                <CardActions sx={{
                                    padding:"0",
                                }} disableSpacing>
                                    <div class="flex flex-col">
                                        <div  class="flex items-center">
                                        { auth.user &&<Checkbox checked={video.liked} onChange={async () => await handleFollowToggle2(video.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                                        <p  className="outlined-text">{video.title}</p>
                                    </div>
                    
                              
                                    </div>
                                </CardActions>
                            </Card>
                      ))}</div>
        </Container>

        
        
      </ThemeProvider>
    </AppLayout>
  );
};

export default Music;
