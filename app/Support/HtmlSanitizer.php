<?php

namespace App\Support;

class HtmlSanitizer
{
    public static function clean(?string $html): ?string
    {
        if ($html === null || $html === '') {
            return $html;
        }

        $config = \HTMLPurifier_Config::createDefault();
        $config->set('Core.Encoding', 'UTF-8');
        $config->set('HTML.Doctype', 'HTML 4.01 Transitional');

        $config->set('HTML.Allowed', 'p,br,strong,b,em,i,u,ul,ol,li,a[href|title|target],h2,h3,h4,blockquote,code,pre,hr,span,div,img[src|alt|width|height],figure,figcaption');
        $config->set('Attr.AllowedFrameTargets', ['_blank']);
        $config->set('AutoFormat.RemoveEmpty', true);
        $config->set('HTML.SafeIframe', false);
        $config->set('Attr.EnableID', false);
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true]);
        $config->set('HTML.TargetBlank', true);

        $purifier = new \HTMLPurifier($config);

        return $purifier->purify($html);
    }
}
