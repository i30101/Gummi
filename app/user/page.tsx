"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProfileTab, SortOption, MockUser, Collection, UserListType } from "@/types";
import { getCurrentUserProfile, getUserHighlights, HighlightCollection } from "@/lib/current-user-data";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/MyProfile/ProfileHeader";
import ProfileHighlights from "@/components/MyProfile/ProfileHighlights";
import HighlightViewer from "@/components/MyProfile/HighlightViewer";
import ProfileTabs from "@/components/MyProfile/ProfileTabs";
import ProfileGummisGrid from "@/components/MyProfile/ProfileGummisGrid";
import ProfileSavedGrid from "@/components/MyProfile/ProfileSavedGrid";
import ProfileCollections from "@/components/MyProfile/ProfileCollections";
import ProfileCollectionDetail from "@/components/MyProfile/ProfileCollectionDetail";
import ProfileWishlist from "@/components/MyProfile/ProfileWishlist";
import EditProfileModal from "@/components/MyProfile/EditProfileModal";
import SettingsPanel from "@/components/MyProfile/SettingsPanel";
import UserListModal from "@/components/MyProfile/UserListModal";
import SuggestedFollowers from "@/components/MyProfile/SuggestedFollowers";
import GummiBearCustomizer from "@/components/GummiBear/GummiBearCustomizer";

export default function UserPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("for-you");

  const [activeTab, setActiveTab] = useState<ProfileTab>("gummis");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userListType, setUserListType] = useState<UserListType | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [highlightViewerIndex, setHighlightViewerIndex] = useState<number | null>(null);
  const [removedSavedIds, setRemovedSavedIds] = useState<Set<string>>(new Set());
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Profile data
  const [profile, setProfile] = useState(getCurrentUserProfile());
  const [profileName, setProfileName] = useState(profile.name);
  const [profileBio, setProfileBio] = useState(profile.bio);

  const handleSaveProfile = useCallback((name: string, bio: string) => {
    setProfileName(name);
    setProfileBio(bio);
    setProfile((prev) => ({ ...prev, name, bio }));
    setEditModalOpen(false);
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    router.push(`/product/${encodeURIComponent(product.id)}`);
  }, [router]);

  const handleUserClick = useCallback((user: MockUser) => {
    // Could navigate to user profile or open a modal
  }, []);

  return (
    <main className="flex min-h-screen bg-(--bg-primary)">
      {/* Sidebar */}
      <Sidebar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={() => {}}
        categories={[]}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        onHomeClick={() => router.push("/")}
        onExploreClick={() => router.push("/explore")}
        onGamesClick={() => router.push("/games")}
        onMessagesClick={() => router.push("/messages")}
        onLikesClick={() => router.push("/likes")}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <ProfileHeader
            profile={{ ...profile, name: profileName, bio: profileBio }}
            onEditClick={() => setEditModalOpen(true)}
            onSettingsClick={() => setSettingsOpen(true)}
            onFollowersClick={() => setUserListType("followers")}
            onFollowingClick={() => setUserListType("following")}
            onCustomizeClick={() => setCustomizerOpen(true)}
          />

          <ProfileHighlights
            userId={profile.id}
            onHighlightClick={(highlight, index) => setHighlightViewerIndex(index)}
          />

          <SuggestedFollowers onUserClick={handleUserClick} />

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="pb-12"
            >
              {activeTab === "gummis" && (
                <ProfileGummisGrid
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                  onProductClick={handleProductClick}
                />
              )}
              {activeTab === "saved" && (
                <ProfileSavedGrid
                  onProductClick={handleProductClick}
                  removedIds={removedSavedIds}
                  onRemove={(id) => setRemovedSavedIds((prev) => new Set(prev).add(id))}
                  onUndoAll={() => setRemovedSavedIds(new Set())}
                />
              )}
              {activeTab === "collections" && (
                <ProfileCollections
                  onCollectionClick={setSelectedCollection}
                />
              )}
              {activeTab === "wishlist" && (
                <ProfileWishlist onProductClick={handleProductClick} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Sub-views */}
          <AnimatePresence>
            {selectedCollection && (
              <ProfileCollectionDetail
                collection={selectedCollection}
                onClose={() => setSelectedCollection(null)}
                onProductClick={handleProductClick}
              />
            )}
          </AnimatePresence>

          <EditProfileModal
            isOpen={editModalOpen}
            name={profileName}
            bio={profileBio}
            avatar={profile.avatar}
            onSave={handleSaveProfile}
            onClose={() => setEditModalOpen(false)}
          />

          <SettingsPanel
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            profile={profile}
          />

          <UserListModal
            type={userListType}
            onClose={() => setUserListType(null)}
            onUserClick={handleUserClick}
          />

          {/* Gummi Bear Customizer */}
          <AnimatePresence>
            {customizerOpen && (
              <GummiBearCustomizer onClose={() => setCustomizerOpen(false)} />
            )}
          </AnimatePresence>

          {/* Highlight story viewer */}
          <AnimatePresence>
            {highlightViewerIndex !== null && (
              <HighlightViewer
                highlights={getUserHighlights(profile.id)}
                initialHighlightIndex={highlightViewerIndex}
                onClose={() => setHighlightViewerIndex(null)}
                onProductClick={(product) => {
                  setHighlightViewerIndex(null);
                  handleProductClick(product);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
