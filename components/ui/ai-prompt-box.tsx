"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowUp,
  Paperclip,
  Square,
  X,
  StopCircle,
  Mic,
  Globe,
  BrainCog,
  FolderCode,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// ─── Textarea ────────────────────────────────────────────────────────────────

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none",
        className
      )}
      ref={ref}
      rows={1}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// ─── Tooltip ─────────────────────────────────────────────────────────────────

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// ─── Dialog ──────────────────────────────────────────────────────────────────

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#333333] bg-[#1F2023] p-0 shadow-xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full bg-[#2E3033]/80 p-2 hover:bg-[#2E3033] transition-all">
        <X className="h-5 w-5 text-gray-200" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-gray-100",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// ─── VoiceRecorder ───────────────────────────────────────────────────────────

interface VoiceRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: (duration: number) => void;
  visualizerBars?: number;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  visualizerBars = 32,
}) => {
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (isRecording) {
      onStartRecording();
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (time > 0) onStopRecording(time);
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full transition-all duration-300 py-3",
        isRecording ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-mono text-sm text-white/80">{formatTime(time)}</span>
      </div>
      <div className="w-full h-10 flex items-center justify-center gap-0.5 px-4">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-white/50 animate-pulse"
            style={{
              height: `${Math.max(15, Math.random() * 100)}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── ImageViewDialog ─────────────────────────────────────────────────────────

interface ImageViewDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageViewDialog: React.FC<ImageViewDialogProps> = ({
  imageUrl,
  onClose,
}) => {
  if (!imageUrl) return null;
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <img
          src={imageUrl}
          alt="Full preview"
          className="w-full max-h-[80vh] object-contain rounded-2xl"
        />
      </DialogContent>
    </Dialog>
  );
};

// ─── PromptInput Context ──────────────────────────────────────────────────────

interface PromptInputContextType {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
}

const PromptInputContext = React.createContext<PromptInputContextType>({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
});

function usePromptInput() {
  return React.useContext(PromptInputContext);
}

// ─── PromptInput ─────────────────────────────────────────────────────────────

interface PromptInputProps {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      className,
      isLoading = false,
      maxHeight = 240,
      value,
      onValueChange,
      onSubmit,
      children,
      disabled = false,
      onDragOver,
      onDragLeave,
      onDrop,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "");
    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };
    return (
      <TooltipProvider>
        <PromptInputContext.Provider
          value={{
            isLoading,
            value: value ?? internalValue,
            setValue: onValueChange ?? handleChange,
            maxHeight,
            onSubmit,
            disabled,
          }}
        >
          <div
            ref={ref}
            className={cn(
              "rounded-3xl border border-[#444444] bg-[#1F2023] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300",
              isLoading && "border-red-500/70",
              className
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    );
  }
);
PromptInput.displayName = "PromptInput";

// ─── PromptInputTextarea ──────────────────────────────────────────────────────

interface PromptInputTextareaProps {
  disableAutosize?: boolean;
  placeholder?: string;
}

const PromptInputTextarea: React.FC<
  PromptInputTextareaProps & React.ComponentProps<typeof Textarea>
> = ({ className, onKeyDown, disableAutosize = false, placeholder, ...props }) => {
  const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      typeof maxHeight === "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [value, maxHeight, disableAutosize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className={cn("text-base", className)}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
};

// ─── PromptInputActions ───────────────────────────────────────────────────────

const PromptInputActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

// ─── PromptInputAction ────────────────────────────────────────────────────────

interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

const PromptInputAction: React.FC<PromptInputActionProps> = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}) => {
  const { disabled } = usePromptInput();
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

// ─── CustomDivider ────────────────────────────────────────────────────────────

const CustomDivider: React.FC = () => (
  <div className="relative h-6 w-[1.5px] mx-1">
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#9b87f5]/70 to-transparent rounded-full" />
  </div>
);

// ─── PromptInputBox (main export) ─────────────────────────────────────────────

interface PromptInputBoxProps {
  onSend?: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export const PromptInputBox = React.forwardRef<
  HTMLDivElement,
  PromptInputBoxProps
>((props, ref) => {
  const {
    onSend = () => {},
    isLoading = false,
    placeholder = "Ask CEVO anything...",
    className,
  } = props;

  const [input, setInput] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [filePreviews, setFilePreviews] = React.useState<{
    [key: string]: string;
  }>({});
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [showThink, setShowThink] = React.useState(false);
  const [showCanvas, setShowCanvas] = React.useState(false);
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  const handleToggleChange = (value: string) => {
    if (value === "search") {
      setShowSearch((p) => !p);
      setShowThink(false);
    } else if (value === "think") {
      setShowThink((p) => !p);
      setShowSearch(false);
    }
  };

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const processFile = (file: File) => {
    if (!isImageFile(file) || file.size > 10 * 1024 * 1024) return;
    setFiles([file]);
    const reader = new FileReader();
    reader.onload = (e) =>
      setFilePreviews({ [file.name]: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = Array.from(e.dataTransfer.files).filter(isImageFile);
    if (dropped.length > 0) processFile(dropped[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaste = React.useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processFile(file);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleSubmit = () => {
    if (!input.trim() && files.length === 0) return;
    const prefix = showSearch
      ? "[Search: "
      : showThink
      ? "[Think: "
      : showCanvas
      ? "[Canvas: "
      : "";
    const formatted = prefix ? `${prefix}${input}]` : input;
    onSend(formatted, files);
    setInput("");
    setFiles([]);
    setFilePreviews({});
  };

  const hasContent = input.trim() !== "" || files.length > 0;

  return (
    <>
      <PromptInput
        ref={ref}
        value={input}
        onValueChange={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        className={cn(
          "w-full bg-[#1F2023] border-[#444444]",
          isRecording && "border-red-500/70",
          className
        )}
        disabled={isLoading || isRecording}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
      >
        {/* File previews */}
        {files.length > 0 && !isRecording && (
          <div className="flex flex-wrap gap-2 pb-1">
            {files.map((file, idx) =>
              isImageFile(file) && filePreviews[file.name] ? (
                <div key={idx} className="relative">
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(filePreviews[file.name])}
                  >
                    <img
                      src={filePreviews[file.name]}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles([]);
                      setFilePreviews({});
                    }}
                    className="absolute top-1 right-1 rounded-full bg-black/70 p-0.5"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Textarea */}
        <div
          className={cn(
            "transition-all duration-300",
            isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100"
          )}
        >
          <PromptInputTextarea
            placeholder={
              showSearch
                ? "Search the web..."
                : showThink
                ? "Think deeply..."
                : showCanvas
                ? "Create on canvas..."
                : placeholder
            }
            className="text-base"
          />
        </div>

        {/* Voice recorder */}
        {isRecording && (
          <VoiceRecorder
            isRecording={isRecording}
            onStartRecording={() => {}}
            onStopRecording={(duration) => {
              setIsRecording(false);
              onSend(`[Voice message - ${duration} seconds]`, []);
            }}
          />
        )}

        {/* Action bar */}
        <PromptInputActions className="flex items-center justify-between gap-2 p-0 pt-2">
          {/* Left actions */}
          <div
            className={cn(
              "flex items-center gap-1 transition-opacity duration-300",
              isRecording ? "opacity-0 invisible h-0" : "opacity-100 visible"
            )}
          >
            <PromptInputAction tooltip="Upload image">
              <button
                onClick={() => uploadInputRef.current?.click()}
                className="flex h-8 w-8 text-[#9CA3AF] cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-600/30 hover:text-[#D1D5DB]"
                disabled={isRecording}
              >
                <Paperclip className="h-5 w-5" />
                <input
                  ref={uploadInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) processFile(e.target.files[0]);
                    if (e.target) e.target.value = "";
                  }}
                />
              </button>
            </PromptInputAction>

            {/* Search toggle */}
            <button
              type="button"
              onClick={() => handleToggleChange("search")}
              className={cn(
                "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8",
                showSearch
                  ? "bg-[#1EAEDB]/15 border-[#1EAEDB] text-[#1EAEDB]"
                  : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
              )}
            >
              <motion.div
                animate={{ rotate: showSearch ? 360 : 0, scale: showSearch ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
              >
                <Globe className="w-4 h-4" />
              </motion.div>
              <AnimatePresence>
                {showSearch && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs overflow-hidden whitespace-nowrap"
                  >
                    Search
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <CustomDivider />

            {/* Think toggle */}
            <button
              type="button"
              onClick={() => handleToggleChange("think")}
              className={cn(
                "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8",
                showThink
                  ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6]"
                  : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
              )}
            >
              <motion.div
                animate={{ rotate: showThink ? 360 : 0, scale: showThink ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
              >
                <BrainCog className="w-4 h-4" />
              </motion.div>
              <AnimatePresence>
                {showThink && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs overflow-hidden whitespace-nowrap"
                  >
                    Think
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <CustomDivider />

            {/* Canvas toggle */}
            <button
              type="button"
              onClick={() => setShowCanvas((p) => !p)}
              className={cn(
                "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8",
                showCanvas
                  ? "bg-emerald-500/15 border-emerald-500 text-emerald-500"
                  : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
              )}
            >
              <motion.div
                animate={{ rotate: showCanvas ? 360 : 0, scale: showCanvas ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
              >
                <FolderCode className="w-4 h-4" />
              </motion.div>
              <AnimatePresence>
                {showCanvas && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs overflow-hidden whitespace-nowrap"
                  >
                    Canvas
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRecording((p) => !p)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                isRecording
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "text-[#9CA3AF] hover:bg-gray-600/30 hover:text-[#D1D5DB]"
              )}
            >
              {isRecording ? (
                <Square className="h-3.5 w-3.5" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading || (!hasContent && !isRecording)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                hasContent || isRecording
                  ? "bg-white text-black hover:bg-white/80"
                  : "bg-[#2E3033] text-gray-500 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <StopCircle className="h-4 w-4" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </PromptInputActions>
      </PromptInput>

      <ImageViewDialog
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
});
PromptInputBox.displayName = "PromptInputBox";
