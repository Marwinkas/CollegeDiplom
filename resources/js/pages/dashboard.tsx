import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Card, CardActions, CardContent, Container, createTheme, CssBaseline, TextField, ThemeProvider } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
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

    const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [photo, setPhoto] = useState('');
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ThemeProvider theme={theme}>
            <div className="m-auto mb-8 w-[100%]">
                    <form onSubmit={handleUpload} className="space-y-4">
                        <div>
                            <label className="mb-1 block">Сообщение</label>
                            <TextField
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded border border-gray-700 bg-gray-800 p-2"
                                multiline
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <div className="relative w-10 cursor-pointer rounded border border-gray-700 bg-gray-800 p-2">
                                    <input
                                        type="file"
                                        accept="audio/*,video/*,image/*"
                                        onChange={handleAudioFileChange}
                                        ref={fileInputRef}
                                        multiple
                                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                    />
                                    <div className="flex items-center justify-center">
                                    
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-50 rounded bg-blue-600 px-4 py-2 transition hover:bg-blue-500">
                                Создать пост
                            </button>
                        </div>
                    </form>
                </div>
                <CssBaseline />
                <Container sx={{ py: 4, minHeight: '100vh', padding: 0, maxWidth: 10000 }}>
                    <TransitionGroup className="m-0 flex w-[100%] flex-wrap gap-[24px] p-0 align-middle">
                        {filteredSongs.map((video) => (
                            <Card
                                sx={{
                                    marginBottom: '20px',
                                    borderRadius: '15px',
                                    width: '200px',
                                    height: '200px',
                                    transition: 'opacity 0.3s',
                                    '&:hover': {
                                        opacity: 0.8,
                                    },
                                }}
                                className="bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${video.imgurl.split(',')[0]})` }}
                            >
                                <CardHeader
                                    avatar={
                                        <>
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                           <AvatarImage src={'http://127.0.0.1:8001/' + video.user.photo}/>
                                             <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(video.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        </>
                                    }
                                    title={video.author}
                                />
                                <CardContent>
                                    <a href={'http://127.0.0.1:8001/dashboard/' + video.id}>
                                        <div className="min-h-11"></div>
                                    </a>
                                </CardContent>
                                <CardActions disableSpacing>
                                { auth.user &&<Checkbox checked={video.liked} onChange={async () => await handleFollowToggle2(video.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                                    {video.title}
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
