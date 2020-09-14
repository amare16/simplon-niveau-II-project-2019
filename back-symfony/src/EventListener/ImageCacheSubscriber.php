<?php


namespace App\EventListener;

use Doctrine\Common\EventSubscriber;


class ImageCacheSubscriber implements EventSubscriber
{
    /**
     * @var CacheManager
     */
    private $cache;
    /**
     * @var UploaderHelper
     */
    private $uploaderHelper;

    public function __construct(CacheManager $cache, UploaderHelper $uploaderHelper)
    {

        $this->cache = $cache;
        $this->uploaderHelper = $uploaderHelper;
    }
    public function getSubscribedEvents()
    {
        return [
            'preRemove',
            'preUpdate',
        ];
    }
}