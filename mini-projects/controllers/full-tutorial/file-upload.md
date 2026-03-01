## File upload - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/ControllersTopic/FileUploadController.php
```

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class FileUploadController extends AbstractController
{
    #[Route('/upload', name: 'ctrl_upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $file = $request->files->get('document');

        if (!$file) {
            return $this->json(['error' => 'No file uploaded'], Response::HTTP_BAD_REQUEST);
        }

        // UploadedFile methods
        $info = [
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'guessed_extension' => $file->guessExtension(),
            'size_bytes' => $file->getSize(),
            'error' => $file->getError(),
            'is_valid' => $file->isValid(),
        ];

        if ($file->isValid()) {
            try {
                $newFilename = uniqid() . '.' . $file->guessExtension();
                $file->move(
                    $this->getParameter('kernel.project_dir') . '/var/uploads',
                    $newFilename,
                );
                $info['saved_as'] = $newFilename;
            } catch (FileException $e) {
                $info['move_error'] = $e->getMessage();
            }
        }

        return $this->json($info, Response::HTTP_CREATED);
    }
}
```

**Step 4:** Test:

```bash
mkdir -p var/uploads
echo "test content" > /tmp/test.txt
curl -X POST -F "document=@/tmp/test.txt" https://127.0.0.1:8000/controllers/upload
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "File upload"](https://symfonycasts.com/search?q=file%2Bupload)
