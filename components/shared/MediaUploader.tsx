'use client';
import { useToast } from '../ui/use-toast';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

type MediaUploaderProps = {
        onValueChange: (value: string) => void;
        setImage: React.Dispatch<any>;
        publicId: string;
        image: any;
        type: string;
};

const MediaUploader = ({ onValueChange, setImage, publicId, image, type }: MediaUploaderProps) => {
        const onUploadSuccessHandler = (result: any) => {
                setImage((prevState: any) => ({
                        ...prevState,
                        publicId: result?.info?.public_id,
                        width: result?.info?.width,
                        height: result?.info?.height,
                        secureURL: result?.info?.secure_url,
                }));

                onValueChange(result?.info?.public_id);
                toast({
                        title: 'Image uploaded successfully',
                        description: '1 credit was deducted from your account.',
                        duration: 5000,
                        className: 'success-toast',
                });
        };
        const onUploadErrorHandler = () => {
                toast({
                        title: 'Something went wrong while uploading image',
                        description: 'Please try again.',
                        duration: 5000,
                        className: 'error-toast',
                });
        };
        const { toast } = useToast();
        return (
                <CldUploadWidget uploadPreset="hha297_imaginify" options={{ multiple: false, resourceType: 'image' }} onSuccess={onUploadSuccessHandler} onError={onUploadErrorHandler}>
                        {({ open }) => (
                                <div className="flex flex-col gap-4">
                                        <h3 className="h3-bold text-dark-600">Original</h3>
                                        {publicId ? (
                                                <>
                                                        <div className="cursor-pointer overflow-hidden rounded-3">
                                                                <CldImage
                                                                        width={getImageSize(type, image, 'width')}
                                                                        height={getImageSize(type, image, 'height')}
                                                                        src={publicId}
                                                                        alt="Image"
                                                                        sizes={'(max-width: 767px) 100vw, 50vw'}
                                                                        placeholder={dataUrl as PlaceholderValue}
                                                                        className="media-uploader_cldImage"
                                                                />
                                                        </div>
                                                </>
                                        ) : (
                                                <div className="media-uploader_cta" onClick={() => open()}>
                                                        <div className="media-uploader_cta-image">
                                                                <Image src="/assets/icons/add.svg" alt="Add Image" width={24} height={24} />
                                                        </div>
                                                        <div className="p-14-medium">Click here to upload Image</div>
                                                </div>
                                        )}
                                </div>
                        )}
                </CldUploadWidget>
        );
};

export default MediaUploader;
