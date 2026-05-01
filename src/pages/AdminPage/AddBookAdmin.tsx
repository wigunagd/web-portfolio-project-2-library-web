import { icArrowUpload, icBackArrow, icTrash, icUpload } from "@/assets/asset";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/redux/3_redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoAddBookAdmin, useGetCategories } from "./hooksAddEditBook";
import { toast } from "sonner";
import type { AddBookAdminResponse } from "./addEditBooktype";
import type { AxiosError } from "axios";
import { generateISBN13 } from "./GenerateIsbn";

const AddBookAdmin = () => {

    const navigate = useNavigate();
    const authState = useAppSelector((state) => state.auth);

    if (authState.user.role !== 'ADMIN') {
        navigate('/login');
    }

    const { data: dataCategories, isLoading: isLoadingCategory } = useGetCategories();
    const { mutate: mutateAddBookAdmin, isPending: isPendingAddBookAdmin } = useDoAddBookAdmin();

    // handle gambar
    const maxPhotoSize = 5 * 1024 * 1024;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileValid, setSelectedFileValid] = useState(true);
    const [selectedFileValidText, setSelectedFileValidText] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);

    const processFile = (file: File) => {
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > maxPhotoSize) {
                setSelectedFileValid(false);
                setSelectedFileValidText(`Picture maximum size is 5MB`);
                return;
            } else {
                setSelectedFileValid(true);
                setSelectedFileValidText(``);
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDeleteImage = () => {
        setPreviewUrl(null);
        setSelectedFile(null);
    }
    // handle gambar


    // handle form
    const [title, setTitle] = useState('');
    const [titleValid, setTitleValid] = useState(true);
    const [author, setAuthor] = useState('');
    const [authorValid, setAuthorValid] = useState(true);
    const [category, setCategory] = useState<number | undefined>(undefined);
    const [categoryValid, setCategoryValid] = useState(true);
    const [numberOfPage, setNumberOfPage] = useState<number | undefined>(undefined);
    const [numberOfPageValid, setNumberOfPageValid] = useState(true);
    const [description, setDescription] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(true);

    const handleTitle = (text: string) => {
        setTitle(text);
        setTitleValid(text.length > 0);
    }

    const handleAuthor = (text: string) => {
        setAuthor(text);
        setAuthorValid(text.length > 0);
    }

    const handleCategory = (cat: number) => {
        setCategory(cat);
        setCategoryValid(cat > 0);
    }

    const handleNumberOfPage = (num: number) => {
        setNumberOfPage(num);
        setNumberOfPageValid(num > 0);
    }

    const handleDescription = (text: string) => {
        setDescription(text);
        setDescriptionValid(text.length > 0);
    }
    // handle form

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let okToSubmit = true;

        if (!selectedFile) {
            setSelectedFileValid(false);
            setSelectedFileValidText(`Picture not selected`);
            okToSubmit = false;
        } else {
            setSelectedFileValid(true);
            setSelectedFileValidText(``);
        }

        if (title.length === 0) {
            setTitleValid(false);
            okToSubmit = false;
        }

        if (author.length === 0) {
            setAuthorValid(false);
            okToSubmit = false;
        }

        if (category === 0) {
            setCategoryValid(false);
            okToSubmit = false;
        }

        if (numberOfPage === 0) {
            setNumberOfPageValid(false);
            okToSubmit = false;
        }

        if (description.length === 0) {
            setDescriptionValid(false);
            okToSubmit = false;
        }

        if (!selectedFile || !okToSubmit) {
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("isbn", generateISBN13());
        formData.append("categoryId", String(category));
        formData.append("authorName", author);
        formData.append("description", description);
        if (selectedFile) {
            formData.append("coverImage", selectedFile);
        }

        mutateAddBookAdmin(formData, {
            onSuccess: () => {
                sessionStorage.setItem('toastSuksesAddPost', '1');
                navigate('/adminpage#booklist');
            },
            onError: (e) => {
                const error = e as AxiosError<AddBookAdminResponse>;
                const errorMessage = error.response?.data.message ?? "An unexpected error occurred";
                toast.error(errorMessage);
            }
        });
    };

    return (
        <>
            <Navbar />

            <main className=" min-h-screen pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-12 grid mb-5">
                <div className="flex flex-col w-full max-w-132.25 gap-8 mx-auto">

                    <a href="/adminpage#booklist" className="flex gap-3 text-sm font-semibold items-center">
                        <img src={icBackArrow} alt="Arrow Back" />
                        <span className="text-xl md:text-display-xs">Add Book</span>
                    </a>


                    <form method="POST"

                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full gap-4">

                        <div className="grid gap-2">
                            <Label htmlFor="bio" className="text-sm font-bold">Title</Label>
                            <Field data-invalid={!titleValid}>
                                <Input
                                    disabled={isPendingAddBookAdmin}
                                    id="title"
                                    name="title"
                                    className="py-2 px-4 rounded-xl"
                                    required
                                    onChange={(e) => handleTitle(e.target.value)}
                                    value={title}
                                    aria-invalid={!titleValid}
                                />
                                {!titleValid && (<FieldLabel className="text-xs text-accent-red">Title required</FieldLabel>)}
                            </Field>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bio" className="text-sm font-bold">Author</Label>
                            <Field data-invalid={!authorValid}>
                                <Input
                                    disabled={isPendingAddBookAdmin}
                                    id="authorName"
                                    name="authorName"
                                    className="py-2 px-4 rounded-xl"
                                    required
                                    onChange={(e) => handleAuthor(e.target.value)}
                                    value={author}
                                    aria-invalid={!authorValid}
                                />
                                {!authorValid && (<FieldLabel className="text-xs text-accent-red">Author required</FieldLabel>)}
                            </Field>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bio" className="text-sm font-bold">Category {isLoadingCategory && (<Spinner />)}</Label>
                            <Field data-invalid={!authorValid}>
                                <select
                                    disabled={isPendingAddBookAdmin}
                                    id="categoryId"
                                    name="categoryId"
                                    className="py-2 px-4 border rounded-xl"
                                    required
                                    value={category}
                                    onChange={(e) => handleCategory(Number(e.target.value))}
                                    aria-invalid={!categoryValid}
                                >
                                    <option value=""></option>
                                    {
                                        dataCategories?.data.categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    }
                                </select>
                                {!categoryValid && (<FieldLabel className="text-xs text-accent-red">Category required</FieldLabel>)}
                            </Field>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bio" className="text-sm font-bold">Number of Pages</Label>
                            <Field data-invalid={!numberOfPageValid}>
                                <Input
                                    disabled={isPendingAddBookAdmin}
                                    id="numberofpages"
                                    name="numberofpages"
                                    className="py-2 px-4 rounded-xl"
                                    required
                                    onChange={(e) => handleNumberOfPage(Number(e.target.value))}
                                    value={numberOfPage}
                                    aria-invalid={!numberOfPageValid}
                                />
                                {!numberOfPageValid && (<FieldLabel className="text-xs text-accent-red">Number of Pages required</FieldLabel>)}
                            </Field>
                        </div>

                        <div className="grid gap-2"> 
                            <Label htmlFor="bio" className="text-sm font-bold">Description</Label>
                            <Field data-invalid={!descriptionValid}>
                                <Textarea
                                    disabled={isPendingAddBookAdmin}
                                    id="description"
                                    name="description"
                                    className="py-2 px-4 h-41.5 rounded-xl"
                                    rows={4}
                                    required
                                    onChange={(e) => handleDescription(e.target.value)}
                                    value={description}
                                    aria-invalid={!descriptionValid}
                                />
                                {!descriptionValid && (<FieldLabel className="text-xs text-accent-red">Description required</FieldLabel>)}
                            </Field>

                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-bold">Photo</Label>
                            <Field data-invalid={!selectedFileValid}>
                                <div className={`flex flex-col w-full min-h-36 border rounded-xl px-6 py-4 border-dashed  
                                ${selectedFileValid ? 'border-neutral-400' : 'border-accent-red'} 
                                ${isDragging && ('border border-neutral-300 rounded-2xl')} `}>

                                    {
                                        !previewUrl && (
                                            <div className={`flex flex-col w-full h-full items-center justify-center p-5 text-neutral-600  `}>

                                                {
                                                    !isDragging && (
                                                        <>
                                                            <Button
                                                                onClick={() => fileInputRef.current?.click()}
                                                                type="button"
                                                                variant={`ghost`}
                                                                className="flex w-10 h-10 p-0 rounded-md border border-neutral-900">
                                                                <img src={icUpload} alt="upload" width={20} height={20} />
                                                            </Button>

                                                            <span className="text-sm font-black "><Button type="button" onClick={() => fileInputRef.current?.click()} variant={'ghost2'} className="text-primary-300 p-0">Click to upload</Button> or drag and drop</span>
                                                            <span className="text-sm font-black ">PNG or JPG  (max. 5mb)</span>
                                                        </>
                                                    )
                                                }

                                                {
                                                    isDragging && (
                                                        <span className="text-sm my-auto font-black h-full min-h-24">Drop image here</span>
                                                    )
                                                }
                                            </div>
                                        )
                                    }

                                    <input
                                        id="avatar"
                                        name="avatar"
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />

                                    {
                                        previewUrl && (
                                            <div className="flex flex-col w-full gap-3">
                                                <img
                                                    id="avatar-img-display"
                                                    src={previewUrl}
                                                    alt={`avatar `}
                                                    className="w-full h-auto max-w-[92px] mx-auto object-contain transition-transform" />

                                                <div className="flex w-full justify-center gap-3">
                                                    <Button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        type="button"
                                                        variant={'ghost'}
                                                        className="border">
                                                        <img src={icArrowUpload} alt="arrow upload" width={20} height={20} />Change Image
                                                    </Button>

                                                    <Button
                                                        onClick={handleDeleteImage}
                                                        type="button"
                                                        variant={'ghost'}
                                                        className="border text-accent-red">
                                                        <img src={icTrash} alt="arrow upload" width={20} height={20} />Delete Image
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                                {!selectedFileValid && (<FieldLabel className="text-xs text-accent-red">{selectedFileValidText}</FieldLabel>)}
                            </Field>
                        </div>

                        <Button
                            disabled={isPendingAddBookAdmin}
                            type="submit"
                            className="w-full rounded-full h-12 text-sm">{isPendingAddBookAdmin && (<Spinner />)} Save</Button>

                    </form>


                </div>
            </main>

            <Footer className="mb-18" />
        </>
    )
}

export default AddBookAdmin;